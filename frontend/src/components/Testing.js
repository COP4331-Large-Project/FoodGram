import React, { useState } from 'react';
import styled from "styled-components";
import LoginImage from "../assets/img/chef_image.png";
function Testing()
{
   return(
    <div class="containerL">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="chef" />
        </div>
        <div class="rightPanel">
            <div class="LoginText">
            <span id="inner-title" class="loginTitle">FoodGram</span><br />
            <div class="form-group">
                <input type="text" class="form-control" id="loginName" placeholder="Username"/>
            </div>
            <div class="form-group ">
                <input type="password" class="form-control" id="loginPassword" placeholder="Password"/>
            </div>
            <input type="submit" id="loginButton" class="buttons" value = "Do It"/>
            <input type="button" id="register" class="buttons" value = "Sign up!"
                onClick={event =>  window.location.href='/register'} />
            </div>
        </div>
    </div>
   );
};

export default Testing;
