const express = require('express');

const ejs = require("ejs");
//const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
const { urlencoded } = require('express');
 

const app=express();

//DB config
require('dotenv').config();
const db = process.env.MongoURI;
//Mongo connect 
mongoose.connect(db,{ useNewUrlParser: true})
.then(()=> console.log(" Mongo DB Connected"))
.catch(err => console.log(err))
//EJS
//app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false }));

//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/user.js'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started and listening on port ${PORT}`));


