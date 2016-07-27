/**
 * Created by susu on 2016/7/27.
 */
var http=require('http');
var querystring = require('querystring');

var postData=querystring.stringify({
    'content':'hahhabbbbbbbbbbbb',
    'cid':'348'
});

var options ={
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    headers:{
         'Accept': 'application/json,text/javascript, */*; q=0.01',
         'Accept-Encoding': 'gzip, deflate',
         'Accept-Language': 'zh-CN',
         'Cache-Control':' no-cache',
         'Connection': 'Keep-Alive',
         'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         'Cookie': 'PHPSESSID=5c8q5u820bsbns4ncrbibg98h2; imooc_uuid=4662b044-1c8e-41f9-b8a2-3d6144367644; ' +
                  'imooc_isnew=1; imooc_isnew_ct=1469610936; cvde=57987bb80b4d8-6; IMCDNS=0;' +
                  ' Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1469609904; ' +
                  'Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1469611016; ' +
                  'loginstate=1; apsid=RhNjkxMjI4OTVmZDk2ZGU0MmY5NDg5MzVhMWUyZDgAAAAAAAAAAAAAA' +
                  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTI4N' +
                  'zA1MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTQ1MjkxNjIxQHFxLmNvbQAAAAAAAAAAAAAAAA' +
                   'AAAGY2NzAzNzQxYmE5M2E4MTVkMWJmNjczODIwOGVlZDQz2XuYV9l7mFc%3DOT; last_login_us' +
                   'ername=1145291621%40qq.com',
         'Host': 'www.imooc.com',
         'Referer': 'http://www.imooc.com/comment/348',
         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                      '(KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586',
         'X-Requested-With': 'XMLHttpRequest'
    }
};

var req=http.request(options,function (res) {      //利用request（options,callback）方法发送一个请求，模拟网上发帖
    console.log(res.statusCode);
    console.log(JSON.stringify(res.headers));

    res.on('data',function (chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });
    res.on('end',function () {
        console.log("good");
    });
});

req.on('error',function () {
    console.log("error");
});
req.write(postData);    
req.end();
