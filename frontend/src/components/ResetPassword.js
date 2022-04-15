import React, { useState } from 'react';
import ResetPasswordImage from "../assets/img/chef_resetpassword.png";


function ResetPassword(){
//     const [email, setEmail] = useState({ value: '', error: '' })
//     const [newPassword, setNewPassword] = useState({ value: '', error: '' })
//     const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    

//     const sendResetPasswordEmail = async event => 
//     {
//         const emailError = emailValidator(email.value)
//         const newPasswordError = passwordValidator(newPassword.value)
//         const confirmPasswordError = passwordValidator(confirmPassword.value)

//         if (emailError || newPasswordError || confirmPasswordError) 
//         {
//             setEmail({ ...email, error: emailError })
//             setNewPassword({ ...newPassword, error: newPasswordError })
//             setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
//             return
//         }

//         event.preventDefault();
//         var obj = {email:email.value,new_password:newPassword.value, confirm_password:confirmPassword.value};
//         //var obj = {email : email.value};
//         var js = JSON.stringify(obj);
//         try{    
//             const response = await fetch('https://foodgram-demo.herokuapp.com/api/forgetpassword',
//                 {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
//             var res = JSON.parse(await response.text());
//             console.log(res.id);
//             if( res.id <= 0 || res.id == undefined){
//                 setMessage('Email not found');
//             }
//             else{
//                 console.log(res.id);
//                 var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
//                 //localStorage.setItem('user_data', JSON.stringify(user));
//                 setMessage('SUCCESS');
//                 console.log(message);
//                 navigation.navigate(LoginScreen);
//             }
//         }
//         catch(e){
//             console.log(e.toString());
//             return;
//         }    
//     };


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
                    <input id="newPassword" type="text" class="form-control col-md-10" placeholder="New Password" />
                  </div>
                    <input id="confirmNewPassword" type="text" class="form-control col-md-10" placeholder="Confirm Password" />
                </div>
                <input type="submit" class="form-controlL btn-danger submit col-md-10" value = "Submit"/>
            {/* </form> */}
            <span id="forgotPasswordResult"></span>
        </div>
     </div>
      );
};
export default ResetPassword;