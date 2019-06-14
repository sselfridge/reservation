import React, { useState, useEffect } from 'react';
import CurrentUser from '../Components/CurrentUser';
import Queue from '../Components/Queue';
import Events from '../Components/Events';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import './QueueContainer.css';

const useStyles = makeStyles(theme => ({
  fab: {
    // margin: theme.spacing(1),
  },
}));

const QueueContainer = () => {
  // const [delay, setDelay] = useState(2000);
  const [queue, setQueue] = useState(true);

  const addToQueue = () => {
    console.log("Add to Queue");
    const phone = document.getElementById('phone').value;
    document.getElementById('phone').value = '';
    fetch('/queue/push', {
      method: 'POST',
      body: JSON.stringify({ phone: phone }),
    })
      .then(response => {
        return response.json();
      })
      .then(function(myJson) {
        console.log("Second Then");
        const newQueue = [];
        myJson.forEach(user => {
          newQueue.push(user.username);
        });
        setQueue(newQueue);
      });
  };

   const classes = useStyles();
  return (
    <div className="content">
      <div className="desktop-content">
        <div className="container">
        <a className="loginButton" href="/auth/google"></a>

          FISH BOWL QUEUE
          <div className="queue-box">
            <CurrentUser />
            <Queue queue={queue} />
          </div>
          <div className="logoutFab">
            <button className="logout" type="button">
              Logout
            </button>
            <input id="phone" type="text" />
            <div className="fab">
              <Fab
                color="secondary"
                aria-label="Add"
                title="Add Yourself to the Queue"
                className={classes.fab}
              >
                <AddIcon onClick={addToQueue} />
              </Fab>
            </div>
          </div>
        </div>
        <div className="container">
        Fishbowl Events. Average length: 8:06
          <div className="queue-box">
            <Events />
          </div>
        </div>
      </div>
      {/* mobile view  */}
      <div className="mobile-content">
        <div className="container">
          FISH BOWL QUEUE
          <div className="queue-box">
            <CurrentUser />
            <Queue />
          </div>
          <div className="logoutFab">
            <button className="logout" type="button">
              Logout
            </button>
            <div className="fab">
              <Fab
                color="secondary"
                aria-label="Add"
                title="Add Yourself to the Queue"
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        </div>
        <div className="container">
          Fishbowl Events. Average length: 8:06
          <div className="queue-box">
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueContainer;
