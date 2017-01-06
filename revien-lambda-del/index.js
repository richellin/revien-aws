'use strict';
process.env.TZ = "Asia/Tokyo";
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

const today = getToday(-7);

exports.del = (event, context, callback) => {
    let params = {
        TableName: tableName,
        Key: {
            id: today
        },
        ReturnValues: 'ALL_OLD'
    };

    let dbDelete = (params) => { return dynamo.delete(params).promise() };

    dbDelete(params).then( (data) => {
        if (!data.Attributes) {
            callback(null, "fin");
            return;
        }
        console.log(`DELETED ITEM SUCCESSFULLY WITH id = ${today}`);
        callback(null, "fin");
    }).catch( (err) => {
        console.log(`DELETE ITEM FAILED FOR id = ${today}, WITH ERROR: ${err}`);
        callback(null, "err");
    });
};

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
