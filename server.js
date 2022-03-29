
const express = require('express');
var passport=require('passport');

const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           


const PORT = process.env.PORT || 5000;  

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/foodgram');//process.env.MONGODB_URI;
mongoose.set('debug', true);
var User=require('./models/User');
const { Redirect } = require('react-router-dom');

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, function(login, password, done) {
  User.findOne({Login: login}).then(function(user){
    console.log(user);
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));



if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}



app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//app.listen(5000);

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});