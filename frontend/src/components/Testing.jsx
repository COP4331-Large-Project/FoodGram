import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
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
        <div className="main">
        <h1>React Search</h1>
        <div className="search">
        <TextField id="standard-basic" label="Search" variant="standard" />
        </div>
        </div>
        </div>
    </div>
   );
};

export default Testing;
