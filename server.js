var express = require("express");
var app = express();
var path = __dirname + '/public/';

app.use(express.static(__dirname + '/public'));  

app.listen(8100,function(){
  console.log("Live at Port 8100");
});