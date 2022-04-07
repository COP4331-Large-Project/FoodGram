import React, { useState } from 'react';
import ResetPasswordImage from "../assets/img/chef_resetpassword.png";

function ForgotPassword(){
      return(
        <div id="forgotPasswordDiv">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeForgotPassword" src={ResetPasswordImage} alt="forgot-password"/>
        </div>
        <div class="LoginText">
            {/* <form onSubmit={doRegister}> */}
                <div class="form-group">
                  <h2 id="text" style={{textAlign: "center"}}>Please input a new password for your account.</h2><br/>
                  <div class="form-group">
                    <input type="text" class="form-control col-md-10" placeholder="New Password" />
                  </div>
                    <input type="text" class="form-control col-md-10" placeholder="Confirm Password" />
                </div>
                <input type="submit" class="form-controlL btn-danger submit col-md-10" value = "Submit"/>
            {/* </form> */}
            <span id="forgotPasswordResult"></span>
        </div>
     </div>
      );
};
export default ForgotPassword;