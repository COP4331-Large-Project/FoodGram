import React from "react";
import LoginImage from "../assets/img/Team_page.png";
function AboutUs() {
  return (
    <div class="section">
      <div class="container">
        <div class="content-section">
          <div class="title">
            <h1 className="extraBold font60">About Us</h1>
          </div>
          <div class="content">
            <h3 className="Bold font40" style={{ textAlign: "center" }}>
              We are Group 22 for COP4331{" "}
            </h3>
            <p className="Bold font20">
              Group 22 was founded in March 2022, when eight students of the COP4331-Spring22 class
              teamed up and opened a channel on Discord to create a MERN stack application focused
              on Food as a central theme. As avid eaters and late-nighters, Group 22 took
              inspiration from the COT4331 class to create their first MERN stack web and mobile
              application. The idea behind this app sprouted from our love of food and community, we
              wanted to create a space that encourages connection, and what better way than to do it
              through food.
            </p>
            {/* <div class="button">
               <a href="">Read More</a>
             </div> */}
          </div>
        </div>
        <div class="image-section" style={{ textAlign: "center" }}>
          <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="Team" />
          <br></br>
          <br></br>
          <p className="Bold font50">
            Here you can explore, engage, and create. The next time you visit our website, we hope
            you find something a little extra to spice up your day.... also sponsored by Elon Musk
          </p>
        </div>
      </div>
    </div>

    // <div id="loginDiv">
    //     <div class="leftPanel">
    //         <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="Team" />
    //     </div>
    //     <div class="LoginText">
    //         <h1>ABOUT US!!!!</h1>
    //     </div>
    // </div>
  );
}

export default AboutUs;
