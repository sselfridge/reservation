import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './Containers/HeaderContainer';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import SignupContainer from './Containers/SignupContainer';
import QueueContainer from './Containers/QueueContainer';
const axios = require('axios');

const App = () => {
  return (
    <div className="App">
      <Router>
        <HeaderContainer />
        <div className="content">
        <QueueContainer />
        </div>
      </Router>
    </div>
  );
};

export default App;
