import React, { useState, useEffect } from 'react';
import Occupado from '../Components/Occupado';
import './HeaderContainer.css';

// const axios = require('axios');


const HeaderContainer = () => {
  const[occupado, setOccupado] = useState(true)



    let description;
    if (occupado === true) {
      description = <div><i className="fa fa-times-circle"></i> <span> Occupado!</span> </div>
    } else if (occupado === false) {
      description = <div><i className="fas fa-check-circle"></i> <span> Open!</span> </div>
    }
  

  return (
    <div className="fluid-container gray">
      <div className="fluid-inner">
        <div className="inner-flex-desktop">
          <h1>ReservationSmith</h1>
          <div className="occupied-indicator">
            <Occupado />
          </div>
        </div>
        <div className="inner-flex-mobile">
          <div>
            <div>
              <i className="fas fa-bars icon-margin-left"></i>
              <h1 className="inline">RS</h1>
            </div>
          </div>
          <i className="fa fa-times-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;
