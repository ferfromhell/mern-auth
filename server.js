const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

const dbURI = require('./config/keys').mongoURI;
mongoose.connect(dbURI,{ useNewUrlParser: true })
  .then(()=> console.log('Connected to mongoDB'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//routes
app.use('/api/users',users);

const port = process.env.PORT || 5555;

app.listen(port, ()=>{
  console.log(`AuthServer running in port ${port}`);
});