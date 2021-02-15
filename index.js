const path=require('path');
const fs=require('fs-extra');
const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');
const moment=require('moment');
const settings=require('./settings.json');

var app=express();
app.set('view engine','ejs');
app.use('/resource',express.static('resource'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'asdasdasdasdasdasddasdasdasdas',
    cookie: { maxAge: 300 * 1000 },
    rolling: true
}));
require('./blog.js')(app,fs,path,moment,settings);
require('./login.js')(app,settings);
require('./new.js')(app,fs,path,settings);
app.listen(process.env.port||80);