const User=require('./../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
  logUserIn: function (login, password) {
    return new Promise((resolve, reject) => {
      User.findOne({
        Login: login
      }).then(user => {
        if(user && user.validPassword(password)){
            let token = jwt.sign({ id: user._id, email: user.Login }, process.env.SERVER_SECRET, { expiresIn: 129600 }); // Sigining the token
            resolve({ success: true, message: "login success!", token: token, user: user });
        } else {
          resolve({ success: false, message: "Authentication failed. Wrong password." });
        }
        // user.verifyPassword(password, (err, isMatch) => {
        //   if (isMatch && !err) {
        //     console.log("1111", user);
        //     let token = jwt.sign({ id: user._id, email: user.Login }, process.env.SERVER_SECRET, { expiresIn: 129600 }); // Sigining the token
        //     resolve({ success: true, message: "Token Issued!", token: token, user: user });
        //   } else {
        //     reject({ success: false, message: "Authentication failed. Wrong password." });
        //   }
        // });
      }).catch(err => {
          reject({ success: false, message: "User not found", error: err })
      });
    })
  }
}