import React, { useState } from 'react';
import styled from "styled-components";
import LoginImage from "../assets/img/chef_image.png";
function Testing()
{
   return(
    <div class="containerL">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="chef" style={{zIndex: 9}} />
        </div>
        <div class="rightPanel">
            <div class="LoginText">
            <span id="inner-title">Please Log In</span><br />
            <input type="text" id="loginName" placeholder="Username"/><br />
            <input type="password" id="loginPassword" placeholder="Password"/><br />
            <input type="submit" id="loginButton" class="buttons" value = "Do It"/>
            <input type="button" id="register" class="buttons" value = "Sign up!"
                onClick={event =>  window.location.href='/register'} />
            </div>
        </div>
    </div>
   );
};

export default Testing;
