var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db=require('./config/connection')
require('dotenv').config();





var app = express();
db.connect((err)=>{
    if (err){console.log("connection error")}
    else 
    console.log('connected successfully');
    
    });
    


  

var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');



app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/admin', adminRouter);


module.exports = app;
