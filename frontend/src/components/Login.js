import React, { useState } from 'react';
import styled from "styled-components";
import LoginImage from "../assets/img/chef_image.png";
import { Redirect } from 'react-router-dom';


function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    let url = "https://foodgram-demo.herokuapp.com/register";
    let element = <a style={{color:'#ff203a'}} href={url}>Sign up!</a>;
    let bp = require('./Path.js');

    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {    
          const response = await fetch(bp.buildPath('api/login'),
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/home';
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
    };

    return(
      <div id="loginDiv" class="containerL">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="chef"/>
        </div>
        <div class="LoginText">
          <form onSubmit={doLogin}>
          <h1 id="title">FoodGram</h1>
            <div class="form-group">
              <input type="text" class="form-control col-md-12" id="loginName" placeholder="Username"
              ref={(c) => loginName = c} />
            </div>
            <div class="form-group">
              <input type="password" class="form-control col-md-12" id="loginPassword" placeholder="Password"
              ref={(c) => loginPassword = c} />
            </div>
              <input type="submit" id="loginButton" class="form-controlL btn-danger submit col-md-12" value = "Login"
              onClick={doLogin}/>
              <div class="form group"> <br/>
              <p class="w-100 text-center"> Don't have an account? {element} </p>
            </div>
          </form>
          <span id="loginResult">{message}</span>
        </div>
      </div>
    );
};
export default Login;