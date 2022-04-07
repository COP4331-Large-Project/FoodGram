import React, { useState } from 'react';
import LoginImage from "../assets/img/chef2_image.png";

function Register()
{
    var registerfName;
    var registerlName;
    var registerLogin;
    var registerPassword;
    var registerEmail;
    const [message,setMessage] = useState('');
    let bp = require('./Path.js');

    let url = "https://foodgram-demo.herokuapp.com/login";
    let element = <a class="changingTextColor" href={url}>Log In!</a>;

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
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="chef2"/>
        </div>
        <div class="RegisterText">
            <form onSubmit={doRegister}>
                <h1 id="title">FoodGram</h1><br/>
                <h2 id="text">Sign up to discover meal ideas, save your favorite recipes, and more!</h2><br/>
                <div class="form-group">
                    <input type="text" id="registerfName" class="form-control col-md-10" placeholder="First Name" 
                        ref={(c) => registerfName = c} />
                </div>
                <div class="form-group">
                    <input type="text" id="registerlName" class="form-control col-md-10" placeholder="Last Name" 
                        ref={(c) => registerlName = c} />
                </div>
                <div class="form-group">
                <input type="text" id="registerEmail" class="form-control col-md-10" placeholder="Email" 
                    ref={(c) => registerEmail = c} />
                </div>
                <div class="form-group">
                <input type="text" id="registerLogin" class="form-control col-md-10" placeholder="Username" 
                    ref={(c) => registerLogin = c} />
                </div>
                <div class="form-group">
                <input type="password" id="registerPassword" class="form-control col-md-10" placeholder="Password" 
                    ref={(c) => registerPassword = c} />
                </div>
                <input type="submit" id="registerButton" class="form-controlL btn-danger submit col-md-10" value = "Register"
                onClick={doRegister} />
                <div class="form group"> <br/>
                    <p class="w-100 text-center">Already have an account? {element} </p><br/>
                </div>
            </form>
            <span id="registerResult">{message}</span>
        </div>
     </div>
    );
};
export default Register;