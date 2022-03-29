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



app.post('/api/register/', async (req, res, next) =>
{
  // incoming: firstName, lastName, login, password
  // outgoing: error
  console.log(req.body);
  const { FirstName, LastName , Login , Password , Email} = req.body;

  const results = User.findOne({ Login: Login, Password: Password }).toArray();
  if(results.length > 0)
    {
            error = 'User already exists';
    }
  else
    {
      console.log(FirstName,LastName);
      var user = new User();
      user.FirstName=FirstName;
      user.LastName=LastName;
      user.Login=Login;
      user.Email=Email;
      console.log("kkk",user);
    
      user.setPassword(Password);
      console.log("lll",user);
      user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
      }).catch(next);
    }
    var ret = { error: error };
    res.status(200).json(ret);
});


app.post('/api/login/', async (req, res, next) => 
{
  const { login, password } = req.body;
  console.log(login,password);

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
    return res.status(422).json({errors: {password: "Email not exist"}});
  }
});  
