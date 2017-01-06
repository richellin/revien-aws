'use strict';
process.env.TZ = "Asia/Tokyo";
const phantomjsLambdaPack = require('phantomjs-lambda-pack');
const exec = phantomjsLambdaPack.exec;
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

AWS.config.region = 'ap-northeast-1';

const today = getToday(0);

exports.put = (event, context, callback) => {
    const scriptPath = path.join(__dirname, 'phantomjs-script.js');
    exec(scriptPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        //console.log(`Result: ${stdout}`);
        //console.log(`Should have no error: ${stderr}`);

        let object = JSON.parse(stdout) || {};
        let sentences = object.data.sentences || {};
        let entrys = object.data.entrys || {};
        let list = {};
        let i = 0;

        // conversation section
        if(sentences) {
          Object.keys(sentences).forEach(function (key) {
            let get = sentences[key];
            let data = {
              ko : get['trsl_orgnc_sentence'],
              en : get['orgnc_sentence'].replace( /<b>|<\/b>/g , ""),
            }
            i = key;
            list[i] = data;
          });
        }

        // sentence, vocabulary section
        if(entrys) {
          Object.keys(entrys).forEach(function (key) {
            let get = entrys[key];

            let data = {
              ko : get['mean'],
              en : get['orgnc_entry_name'],
            }
            list[i] = data;
            i++;

            if(get['extra_description']) {
              let descriptions = get['extra_description'].substring(1,get['extra_description'].length).replace( /<autoLink search=".*?">|<\/autoLink>/g, "").split("☞");

              Object.keys(descriptions).forEach(function (k) {
                let split_des = descriptions[k].split("<br>");
                let data = {
                  ko : split_des[1],
                  en : split_des[0],
                }
                list[i] = data;
                i++;
              });
            }

          });
        }
        console.log(JSON.stringify(list));

        let item = {
            id: today,
            doc: JSON.stringify(list)
        };

        let params = {
            TableName: tableName,
            Item: item
        };

        let dbPut = (params) => { return dynamo.put(params).promise() };

        console.log(`today = ${today}`);

        dbPut(params).then( (data) => {
            console.log(`PUT ITEM SUCCEEDED WITH doc = ${item.doc}`);
            callback(null, 'fin');
        }).catch( (err) => {
            console.log(`ERROR: ${err}`);
            callback(null, 'err');
        });
    })
}

function getToday(diff){
    let d = new Date();
    d.setDate(d.getDate() + diff);
    let today = d.getFullYear();

    if(d.getMonth()+1 < 10) {
        today+='0'+(d.getMonth()+1);
    } else {
        today+=''+(d.getMonth()+1);
    }
    if(d.getDate() < 10) {
        today+='0'+(d.getDate());
    } else {
        today+=''+(d.getDate());
    }
    return today;
}
