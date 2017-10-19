/**
 * Created by Marmik on 04/10/2016.
 */
var express = require('express');
var app = express();

var request = require('request');
app.get('/trans', function (req, res) {
    var param1=req.query.text;
    var param2=req.query.lang;
    var result={
        'ans': []

    };




  //  https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=BTgFTMYEcTLo&text=I+am+so+happy+today
    param1='https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170914T011706Z.b041c90634bc5f87.5e1743e2630797d99b094d0bb0dcc6e3a01c5112&text='+param1+'&lang='+param2;
    console.log(param1);
    request(param1, function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);


        result.ans.push({'positive': body.text});
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
    });

    console.log(result);


})
app.get('/getP', function (req, res) {
    var param1=req.query.text;
    var result1={
    'ans':[]

    };
    param1='https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=BTgFTMYEcTLo&text='+ param1;
    console.log(param1);
    request(param1, function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);


        result1.ans.push({'positive': body.negative,
            'negative':body.positive});

        res.contentType('application/json');
        res.write(JSON.stringify(result1));
        res.end();
    });
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
