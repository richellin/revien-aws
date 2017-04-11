// headlessブラウザを作成
var fs = require('fs');
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

var today = getToday();

var url = 'http://dict-channelgw.naver.com/endic/kr/enko/today/'+today+'/conversation.dict';

page.open(url, function(status) {
  console.log(page.plainText);
  phantom.exit();
});

// get Today(YYYYMMDD)
function getToday(){
    var d = new Date();
    var today = d.getFullYear();

    if(d.getMonth()+1 < 10) {
        today+='0'+(d.getMonth()+1);
    } else {
        today+=(d.getMonth()+1);
    }

    if(d.getDate() < 10) {
        today+='0'+(d.getDate());
    } else {
        today+=(d.getDate());
    }
    return today;
}
