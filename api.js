var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const sgMail = require("@sendgrid/mail");
const { Console } = require('console');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  console.log(User.findOne({Login: Login}))

  // BUG: CHECK DOES NOT WORK, ALWAYS GETS HIT
  User.findOne({Login: Login}).then(function(user){
     return res.json("User created");
  });


  var user = new User();
  user.Firstname=FirstName;
  user.Lastname=LastName;
  user.Login=Login;
  user.Email=Email;
  user.EmailVerified=false;
  console.log("lll",user);
  user.setPassword(Password);
  user.save().then(function(){
   // return res.json({user: user.toAuthJSON()});

   // EMAIL VERIFICATION SEND
   const msg = {
    from: "foodgramdemocop4331@gmail.com",
    to: user.Email,
    subject: "Food gram - Verify your email",
    text: `
        Hello, thanks for registering with foodgram!
        Please click the following link to verify your account.
        http://foodgram-demo.herokuapp.com/api/verify-email?token=${user.Login}
    `,
                html: `
        Hello, thanks for registering with foodgram!
        Please click the following link to verify your account.
        http://foodgram-demo.herokuapp.com/api/verify-email?token=${user.Login}
    `
    };
    try
    {
        sgMail.send(msg);
        //req.flash('Success', 'Thanks for registering!');
        console.log('Email sent')
        //res.redirect('/');
        error = 'Email sent correctly';
    }catch(error)
    {
        console.log(error);
        req.flash('error', 'Something went wrong. Please contact us at foodgram@gmail.com')
    }
    //return res.json("Account creation successful");
  }).catch(next);
});

app.get('/api/verify-email', async (req, res, next) =>
{
   try{
      var user = await User.findOne({Login: req.query.token})
      if (!user)
      {
          return res.json("User not found");
      }
      console.log(req.query.token);
      console.log("Saving user");

      User.findOneAndUpdate({Login: req.query.token}, {EmailVerified: true}, {upsert: true}, function(err, doc){
        return res.send('User verified!');
     });
   }
   catch(error){
       console.log(error);
   }
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
    //  user.token = user.generateJWT();
   //   return res.json({user: user.toAuthJSON()});
        var ret = {id: user.id, firstName: user.Firstname, lastName: user.Lastname, error: ''}
        return res.status(200).json(ret);
    } else {
        var ret = {id: -1, firstName: '', lastName: '', error: 'Login/Password Invalid'}
        return res.status(200).json(ret);
    }
  })(req, res, next);

});

app.post('/api/forgetpassword/', async (req, res, next) => 
{
  const { email, new_password,confirm_password } = req.body;
  if(new_password!=confirm_password) return res.status(422).json({errors: {password: "the password you entered does not match"}});

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


var multer = require('multer');
var storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, './public/images');
},
filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if (file.mimetype === 'image/png') {
        filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
}
});
const multerFilter = (req, file, cb) =>{
    if(file.mimetype.split('/')[1] === 'png' || 'jpg'){
        cb(null, true)
    }
    else
    {
        cb(new Error('Must be a jpg or png'), false)
    }
}

var upload = multer({ storage: storage });

app.post('/api/upload/', upload.single('file'), function(req, res, next) {
//console.log(req.file);
var createAt = Date.now();
var name = req.file.filename;
//const newPost = { userid: userid, name: name, recipe: recipe};
//console.log(name);
const db = client.db('foodgram');
const result = db.collection('posts').insertOne({name: name, date: createAt});
if(!req.file) {
  res.status(500);
  //return next(err);
}
else
{
    res.status(200).json({
        status: 'success',
        message: 'Image uploaded successfully'
    })
}
});

}