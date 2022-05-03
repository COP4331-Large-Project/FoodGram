import React from 'react';
import LoginImage from "../assets/img/Team_page.png";
function AboutUs()
{
   return(
    <div id="loginDiv">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="Team" />
        </div>
        <div class="LoginText">
            <h1>ABOUT US!!!!</h1>
        </div>
    </div>
   );
};

export default AboutUs;