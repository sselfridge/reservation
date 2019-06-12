import React from "react";
import './SignupContainer.css';





const SignupContainer = ()  => {
 
  fetch('/events')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });

  return (
    <div className="container"> 
      <h1>Welcome to Reservation Smith</h1>
    </div>
  );
};

export default SignupContainer;
