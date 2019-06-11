import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderContainer from "./Containers/HeaderContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignupContainer from "./Containers/SignupContainer";
import QueueContainer from "./Containers/QueueContainer";

const App = () => {

  //test a request to the server
  // fetch(`/api/`, {
  //   accept: "application/json"
  // })
  //   .then(checkStatus => { })
  //   .then(parseJSON => { console.log(`Json: ${parseJSON}`);});


  return (
    <div className="App">
      <Router>
        <HeaderContainer />
        <div className="content">
          <Route path="/" exact component={SignupContainer} />  
          <Route path="/queue" exact component={QueueContainer} />
        </div>
      </Router>
    </div>
  );
};

export default App;
