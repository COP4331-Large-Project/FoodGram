const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;


//Create Schema
const UserSchema = new Schema({
  UserId: {
    type: Number
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Login: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },

  //modified use schema for pass hashing and added time stamp in case we need it later
  hash: String,
  salt: String

},  {timestamps: true});




// if user id already exists
UserSchema.plugin(uniqueValidator, {message: 'user name is already taken.'});

// password hashing
UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

// set pass encryption
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

//Jwt gerenrator
UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    Login: this.Login,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

//Json Token Authentication
UserSchema.methods.toAuthJSON = function(){
  return {
    Login: this.Login,
    Email: this.Email,
    token: this.generateJWT(),
  };
};

module.exports = user = mongoose.model("users", UserSchema);


