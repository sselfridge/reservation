import React from "react";
import CurrentUser from "../Components/CurrentUser";
import Queue from "../Components/Queue";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import './QueueContainer.css';

const useStyles = makeStyles(theme => ({
  fab: {
    // margin: theme.spacing(1),
  },
}));

const QueueContainer = () => {
  const classes = useStyles();
  return(
    <div className="container"> 
      FISH BOWL QUEUE
        <div className="queue-box">
          <CurrentUser />
          <Queue />
        </div>
        <div className="logoutFab">
        <button className="logout" type="button">Logout</button>
        <div className="fab">
        <Fab color="secondary" aria-label="Add" title="Add Yourself to the Queue" className={classes.fab}>
          <AddIcon />
        </Fab>
        </div>

        </div>
        
    </div>
    

  )
}

export default QueueContainer;