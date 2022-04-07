import React, { useState } from 'react';
import LoginImage from "../assets/img/chef_forgotpassword.png";

function ForgotPassword(){
        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var userId = ud.id;
        var firstName = ud.firstName;
        var lastName = ud.lastName;
        const doLogout = event => 
        {
        event.preventDefault();
            localStorage.removeItem("user_data")
            window.location.href = '/';
        };
      return(
        <div id="forgotPasswordDiv">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeForgotPassword" src={LoginImage} alt="forgot-password"/>
        </div>
        <div class="LoginText">
            {/* <form onSubmit={doRegister}> */}
                <div class="form-group">
                  <h2 id="text" style={{textAlign: "center"}}>Please input the email address associated with your account.</h2><br/>
                  <input type="text" class="form-control col-md-10" placeholder="Email" />
                </div>
                <input type="submit" class="form-controlL btn-danger submit col-md-10" value = "Submit"/>
            {/* </form> */}
            <span id="forgotPasswordResult"></span>
        </div>
     </div>
      );
};
export default ForgotPassword;