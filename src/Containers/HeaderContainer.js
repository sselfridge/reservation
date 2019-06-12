import React from 'react';
import './HeaderContainer.css';

const HeaderContainer = () => {
  return (
    <div className="fluid-container gray">
      <div className="fluid-inner">
        <div className="inner-flex-desktop">
          <h1>ReservationSmith</h1>
          <div className="occupied-indicator">
            <i className="fa fa-times-circle"></i><span> Occupado!</span>
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
