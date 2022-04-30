import React from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage';
import Testing from './pages/Testing';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


const user_data = localStorage.getItem("user_data");
function App() {
  return (
    <Router >
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Switch>
        <Route path="/" exact render={() => (!user_data ? <LandingPage/> : (<Redirect to='/home'/>))} />    
        <Route path="/login" render={() => (!user_data ? <LoginPage/> : (<Redirect to='/home'/>))} />       
        <Route path="/register" render={() => (!user_data ? <RegisterPage/> : (<Redirect to='/home'/>))} />       
        <Route path="/home" render={() => (user_data ? <HomePage/> : (<Redirect to='/'/>))} />          
        <Route path="/testing" render={() => (user_data ? <Testing/> : (<Redirect to='/'/>))} />       
        <Route path="/forgot-password" render={() => (user_data ? <ForgotPasswordPage/> : (<Redirect to='/'/>))} />       
        <Route path="/reset-password" render={() => (user_data ? <ResetPasswordPage/> : (<Redirect to='/'/>))} />       
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
export default App;
