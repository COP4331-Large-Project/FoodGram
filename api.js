var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.connect(url);//process.env.MONGODB_URI;
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

exports.setApp = function (app ) {

app.post('/api/register/', async (req, res, next) =>
{
  // incoming: firstName, lastName, login, password
  // outgoing: error
  const { FirstName, LastName , Login , Password , Email} = req.body;
  console.log(FirstName,LastName);
  User.findOne({Login: Login}).then(function(user){
    console.log("rrrrrr",user);
  })
  var user = new User();
  user.Firstname=FirstName;
  user.Lastname=LastName;
  user.Login=Login;
  user.Email=Email;
  console.log("lll",user);
  user.setPassword(Password);
  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});


app.post('/api/login/', async (req, res, next) => 
{
  const { login, password } = req.body;
  console.log(login,password);
  if(!login){
    return res.status(422).json({errors: {Login: "can't be blank"}});
  }

  if(!password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }
    console.log(user);
    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
     // return res.status(422).json(info);
      res.redirect('/api/login');
    }
  })(req, res, next);

});

app.post('/api/forgetpassword/', async (req, res, next) => 
{
  const { email, new_password,confirm_password } = req.body;
  if(new_password!=confirm_password) return res.status(422).json({errors: {password: "not match"}});

  var user=await User.findOne({Email: email});
  var new_user=user;
  if (user) {
  await user.deleteOne();
  new_user.setPassword(new_password);
  new_user.save();
  res.redirect('/api/login');
  }
  else {
    return res.status(422).json({errors: {password: "Email does not exist"}});
  }

});  

}
