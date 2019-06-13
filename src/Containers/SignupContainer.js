import React from "react";
import './SignupContainer.css';





const SignupContainer = ()  => {
 
  return (
    <div className="container"> 
      <h1>Welcome to Reservation Smith</h1>
      <a href="/auth/google">LOGIN WITH THE GOOGLES!!!!</a>
      <input type="button" className="loginButton" />
    </div>
  );
};

export default SignupContainer;
