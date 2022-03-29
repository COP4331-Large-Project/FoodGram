import React, { useState } from 'react';

function Register()
{
    var registerfName;
    var registerlName;
    var registerLogin;
    var registerPassword;
    var registerEmail;
    const [message,setMessage] = useState('');
    let bp = require('./Path.js');


    const doRegister = async event => 
    {
        event.preventDefault();
       
        var obj = 
        {FirstName:registerfName.value,
        LastName:registerlName.value,
        Login:registerLogin.value,
        Password:registerPassword.value, 
        Email:registerEmail.value
        };

        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('could not register');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/';
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
    };
    return(
      <div id="registerDiv">
        <form onSubmit={doRegister}>
        <span id="inner-title">Register</span><br /><br />
        <input type="text" id="registerfName" placeholder="First Name" 
            ref={(c) => registerfName = c} /><br/>
        <input type="text" id="registerlName" placeholder="Last Name" 
            ref={(c) => registerlName = c} /><br/>
        <input type="text" id="registerEmail" placeholder="Email" 
            ref={(c) => registerEmail = c} /><br/>
        <input type="text" id="registerLogin" placeholder="Username" 
            ref={(c) => registerLogin = c} /><br/>
        <input type="password" id="registerPassword" placeholder="Password" 
            ref={(c) => registerPassword = c} /><br/>
        <input type="submit" id="registerButton" class="buttons" value = "Register"
          onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>
     </div>
    );
};
export default Register;