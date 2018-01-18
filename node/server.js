var express = require('express')
var app = express()
var router = require('./router/router.js')
var postRouter = require('./router/postRouter.js')
var catRouter = require('./router/catRouter.js')
var mongoose = require('mongoose')
var cors = require('cors')

var bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('upload'));
app.use(express.static('Catupload'));

app.use('/user',router);
app.use('/post',postRouter);
app.use('/cat',catRouter);
mongoose.connect("mongodb://localhost:27017/ppl");

app.listen(8085,function()
{

	console.log("PPL is Live Now");
})


