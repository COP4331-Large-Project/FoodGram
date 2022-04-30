import React, { useState } from "react";
import styled from "styled-components";
import LoginImage from "../assets/img/chef_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';

function Login() {
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState("");

  let element = (
    <a class="changingTextColor" href="/register">Sign up!</a>
  );

  let bp = require("./Path.js");

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { login: loginName.value, password: loginPassword.value };

    //Check if fields are valid
    if(obj.login == "" || obj.password == "")
    {
      setMessage("Please enter login/password");
      return;
    }

    // var js = JSON.stringify(obj);
    try {
      const response = await axios.post(bp.buildPath("api/login"), obj);
      var res = response.data;
      console.log("login_info", res);
      if (!res.success) {
        setMessage(res.message);
      } else {
        // var user = { firstName: res.user.firstName, lastName: res.user.LastName, id: res.user.id , accessToken: res.token};
        localStorage.setItem("user_data", JSON.stringify(res));
        setAuthToken(res.token);
        setMessage(res.message);
        // console.log("3333333", res.message);
        window.location.href = "/home";
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv">
      <div class="leftPanel">
        <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="chef" />
      </div>
      <div class="LoginText">
        <form onSubmit={doLogin}>
          <h1 id="title">FoodGram - Sign Up Page</h1>
          <div class="form-group">
            <input
              type="text"
              class="form-control col-md-12"
              id="loginName"
              placeholder="Username"
              ref={(c) => (loginName = c)}
            />
          </div>
          <div class="form-group">
            <input
              type={passwordShown ? "text" : "password"}
              class="form-control col-md-12"
              id="loginPassword"
              placeholder="Password"
              ref={(c) => (loginPassword = c)}
            />
            <span onClick={togglePassword} class="field-icon">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </span>
          </div>
          <input
            type="submit"
            id="loginButton"
            class="form-controlL btn-danger submit col-md-12"
            value="Login"
            onClick={doLogin}
          />
          <div class="form-group">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <label class="checkbox-wrap checkbox-primary">Remember Me</label>
            <a class="changingTextColor right" href="/forgot-password">
              {" "}
              Forgot your password?
            </a>
          </div>
          <div class="form-group">
            <p class="w-100 text-center">Don't have an account? {element}</p>
          </div>
        </form>
        <span id="loginResult" class="w-100 text-center" style={{ color: "#ff3333" }}>
          {message}
        </span>
      </div>
    </div>
  );
}
export default Login;

