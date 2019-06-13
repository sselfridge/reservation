import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderContainer from "./Containers/HeaderContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignupContainer from "./Containers/SignupContainer";
import QueueContainer from "./Containers/QueueContainer";

const App = () => {


  // test a request to the server
  fetch(`/queue/`).then(function(response) {
    if(response.status === 200) console.log("Logged in");
    else console.log("Not Logged");
  })
  

  return (
    <div className="App">
      <Router>
        <HeaderContainer />
        <div className="content">
          <Route path="/" exact component={SignupContainer} />  
          <Route path="/line" exact component={QueueContainer} />
        </div>
      </Router>
    </div>
  );
};

export default App;
