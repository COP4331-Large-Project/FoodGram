import React, { useState } from 'react';
import ResetPasswordImage from "../assets/img/chef_resetpassword.png";


function ResetPassword(){

    var resetPassword;
    var newPassword;
    var confirmPassword;
    const [message,setMessage] = useState('');
    let bp = require('./Path.js');

    const doResetPassword = async event => {
        event.preventDefault();
        var obj = {Email:resetPassword.value};
        var js = JSON.stringify(obj);

        // Check if passwords match
        if (newPassword.value != confirmPassword.value) {
            setMessage("Passwords do not match.");
            return;
        }

        try
        {
          const response = await fetch(bp.buildPath('api/resetpassword'),
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
              setMessage(res.error);
            }
            else
            {
              setMessage(res.error);
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };

      return(
        <div id="forgotPasswordDiv">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeForgotPassword" src={ResetPasswordImage} alt="forgot-password"/>
        </div>
        <div class="LoginText">
            <form onSubmit={doResetPassword}>
                <div class="form-group">
                  <h2 id="text" style={{textAlign: "center"}}>Please input a new password for your account.</h2><br/>
                  <div class="form-group">
                    <input id="newPassword" type="text" class="form-control col-md-10" placeholder="New Password" ref={(c) => newPassword = c}/>
                  </div>
                    <input id="confirmPassword" type="text" class="form-control col-md-10" placeholder="Confirm Password" ref={(c) => confirmPassword = c}/>
                </div>
                <input type="submit" class="form-controlL btn-danger submit col-md-10" value = "Submit" onClick={doResetPassword}/>
            </form>
            <span id="resetPasswordResult" class="w-100 text-center" style={{marginLeft:"-60px"}}>{message}</span>
        </div>
     </div>
      );
};
export default ResetPassword;