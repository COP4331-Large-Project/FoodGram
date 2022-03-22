import React, { useState } from 'react';
import styled from "styled-components";
import LoginImage from "../assets/img/chef_image.png";
import { Redirect } from 'react-router-dom';


function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');

    const app_name = 'foodgram-demo'

    function buildPath(route)
    {
     if (process.env.NODE_ENV === 'production') 
        {
           return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
     else
     {        
        return 'http://localhost:5000/' + route;
     }
    }

    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('api/login'),
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
      <div id="loginDiv">
        <ImageWrapper>
            <Img className="radius8" src={LoginImage} alt="chef" style={{zIndex: 9}} />
        </ImageWrapper>
        <div class="LoginText">
          <h1 id="title" class="LoginTitle">FoodGram</h1>
          <form onSubmit={doLogin}>
          <span id="inner-title">Please Log In</span><br />
          <input type="text" id="loginName" placeholder="Username" 
              ref={(c) => loginName = c} /><br />
          <input type="password" id="loginPassword" placeholder="Password" 
              ref={(c) => loginPassword = c} /><br />
          <input type="submit" id="loginButton" class="buttons" value = "Do It"
            onClick={doLogin} />
          </form>
          <input type="button" id="register" class="buttons" value = "Sign up!"
            onClick={event =>  window.location.href='/register'} />
        </div>
        <span id="loginResult">{message}</span>
     </div>
    );
};
const ImageWrapper = styled.div`
position: absolute;
width: 800px;
height: 700px;
left: calc(50% - 700px/2 - 50px);
top: calc(50% - 700px/2 + 120px);
`;
const Img = styled.img`
  position: absolute;
  width: 700px;
  height: 700px;
  left: calc(50% - 960px/2 - 304px);
  top: calc(50% - 960px/2 + 1.5px);
`;

export default Login;