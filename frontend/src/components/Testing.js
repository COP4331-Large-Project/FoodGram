import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import LoginImage from "../assets/img/chef_image.png";

function Testing()
{
  let url="https://foodgram-demo.herokuapp.com/register";
  let element=<a style={{color:'#ff203a'}} href={url}>Sign up!</a>;

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
                <div class="form-group">
                    <input type="password" class="form-control" id="loginPassword" placeholder="Password"/>
                </div>
                    <input type="submit" id="loginButton" class="form-control btn-danger submit" value = "Login"/>
                <div class="form group"> <br/>
                    <p class="w-100 text-center"> Don't have an account? {element} </p>
                </div>
            </div>
        </div>
    </div>
   );
};

export default Testing;
