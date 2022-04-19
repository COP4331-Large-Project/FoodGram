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
  var user = await User.findOne({Login: Login})
  if (user)
  {
      var ret = {id: -1, firstName: '', lastName: '', error: 'User already exists'}
      return res.status(200).json(ret);
    //return res.json("User already exists");
  }
  
    
  var user = await User.findOne({Email: Email})
  if (user)
  {
    var ret = {id: -1, firstName: '', lastName: '', error: 'Email already exists'}
    return res.status(200).json(ret);
    //return res.json("Email already exists");
  }


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
    from: "FoodGramDemoCOP4331@gmail.com",
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
        return res.json("Register successful! Please verify your email.");
    }catch(error)
    {
        console.log(error);
        req.flash('error', 'Something went wrong. Please contact us at foodgram@gmail.com')
    }
    //return res.json("Account creation successful");
  }).catch(next);
});


app.post('/api/forgotpassword/', async (req, res, next) =>
{
  var id = -1;
  const { Email } = req.body;
  console.log(Email);
  console.log(User.findOne({Email: Email}))
  var user = await User.findOne({Email: Email})
  if (!user)
  {
      var ret = {id: -1, firstName: '', lastName: '', error: 'Email does not exist!'}
      return res.status(200).json(ret);
  }

  // EMAIL VERIFICATION SEND
  const msg = {
  from: "FoodGramDemoCOP4331@gmail.com",
  to: user.Email,
  subject: "FoodGram - Follow link to reset password!",
  text: `
      Hello!
      Please click the following link to reset your password.
      https://foodgram-demo.herokuapp.com/reset-password?token=${user.salt}
  `,
              html: `
              Hello!
      Please click the following link to reset your password.
      https://foodgram-demo.herokuapp.com/reset-password?token=${user.salt}
  `
  };
  try
  {
      sgMail.send(msg);
      //req.flash('Success', 'Thanks for registering!');
      console.log('Email sent')
      //res.redirect('/');
      error = 'Email sent correctly';
      var ret = {id: 1, error: 'An email was sent to your inbox!'}
      return res.json(ret);
  }catch(error)
  {
      console.log(error);
      var ret = {id: -1, error: 'Something went wrong. Please contact us at foodgram@gmail.com'}
      return res.json(ret);
  }
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
        if (!user.EmailVerified)
        {
          var ret = {id: -1, firstName: '', lastName: '', error: 'Please verify your email!'}
        }
        return res.status(200).json(ret);
    } else {
        var ret = {id: -1, firstName: '', lastName: '', error: 'User/Password combination incorrect'}
        return res.status(200).json(ret);
    }
  })(req, res, next);

});

app.post('/api/reset-password', async (req, res, next) => 
{
  const { new_password,confirm_password } = req.body;
  if(new_password!=confirm_password) return res.status(422).json({error: {password: "the password you entered does not match"}});


  try{
    var user = await User.findOne({salt: req.query.token})
    if (!user)
    {
        return res.json("Email not found");
    }
    console.log(user.Login);

    // Creates a temp user to set hash and salt for new password
    var tempUser = new User();
    console.log(confirm_password);
    tempUser.setPassword(confirm_password);

    // Updates hash and salt from tempUser to the User
    User.findOneAndUpdate({salt: req.query.token}, {hash: tempUser.hash}, {upsert: true}, function(err, doc){
      console.log("Updated hash!")});
    User.findOneAndUpdate({salt: req.query.token}, {salt: tempUser.salt}, {upsert: true}, function(err, doc){
      console.log("Updated salt!")
      return res.send('Password updated!');
   });
 }
 catch(error){
     console.log(error);
 }
});  


var multer = require('multer');
var imgModel = require('./models/image');
var storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, './public/images');
},
filename: (req, file, cb) => {
    //console.log(file);
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

var name = req.file.filename;
var obj = {
  name: req.body.name,
  userId: req.body.userId,
  imagePath: name,
  ingredients: req.body.ingredients,
  recipe: req.body.recipe,
  category: req.body.category
}
imgModel.create(obj, (err, item) => {
  if(err) {
    res.status(500);
    console.log(err);
  }
  else {
    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully'
    })
  }
})
});

app.get('/api/searchCategory', function(req, res, next) {
{
  try {
    const category  = req.body.category;
    console.log(category);
    // var obj = {
    //   category: req.body.category
    // }
    imgModel.find({}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
    // if (!results) {
    //   var ret = { error: 'No results found' };
    //   return res.status(200).json(ret);
    // }
    // else {
    //   var ret = { name: results.name, userId: results.userId, imagePath: results.imagePath, recipe: results.recipe, category: results.category };
    //   return res.status(200).json(ret);
    // }
  }
  catch(error) {
    console.log(error);
  }
}
});


// Search api that returns matches on name, recipe, or category
// Takes in search string
// If search is blank, every recipe is returned
app.post('/api/search/', async function(req, res, next) {

  const { search } = req.body;

  imgModel.find({
    $or: [
      {
        "name": {'$regex': search}
      },
      {
        "recipe": {'$regex': search}
      }, 
      {
        "category": {'$regex': search}
      }, 
    ]
  }
  
  , function(err, result) {

    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

  console.log(search);

});

// Search api that returns matches on name, recipe, or category
// Takes in search string
// If search is blank, every recipe is returned
app.post('/api/deleteRecipe/', async function(req, res, next) {

  const { postID, userID } = req.body;
  
  // Checks if id string is valid
  if(!mongoose.Types.ObjectId.isValid(postID)) {
    var ret = {id: -1, error: "Can't find recipe"}
    return res.json(ret);
  }

  try{

    var recipe = await imgModel.findById(postID);

    // Checks if recipe exists
    if (!recipe)
    {
      var ret = {id: -1, error: "Can't find recipe"}
      return res.json(ret);
    }

    else 
    {
      console.log(recipe.userId);

      // Deletes if recipe's user id matches taken in user id
      if (recipe.userId == userID)
      {
        imgModel.findById(postID).deleteOne().exec();
        var ret = {id: 1, error: 'Post deleted!'}
        return res.json(ret);
      }

      // Returns error if user ids do not match
      else
      {
        var ret = {id: -1, error: "You cannot delete this post!"}
        return res.json(ret);
      }
    }
  }
  catch(error){
      console.log(error);
  }
});
}
