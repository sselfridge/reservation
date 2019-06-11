const MockGpio = require('./MockGpio');

const piController = {
  objIO: {
    red: null,
    yellow: null,
    green: null,
    doorStatus: null,
    doorTime: 0,
    //constants for the door values
    OPEN: 1,
    CLOSED: 0,

    //constants for LED values
    ON: 1,
    OFF: 0,

    //time constants
    STATE_CHANGE_TIMEOUT: 30000,   //time in new door state before changing
  },
};
piController.setupIO = setupIO;
//obj that will have the current status of all IO bits

const CURRENT_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'dev';

// for Production it will look at the actuall Pi
// rest will use mockups driven by the ui
// prettier-ignore
function setupIO(){
    console.log(`PI Controller: Setup IO`);
if (CURRENT_ENV === 'production') {
    var onoff = require('onoff');
    const Gpio = onoff.Gpio;
    piController.objIO.doorStatus =  new Gpio(4, 'in');
    piController.objIO.red =         new Gpio(17, 'out');
    piController.objIO.yellow =      new Gpio(27, 'out');
    piController.objIO.green =       new Gpio(22, 'out');
  } else {
    piController.objIO.doorStatus = new MockGpio();
    piController.objIO.red = new MockGpio();
    piController.objIO.yellow = new MockGpio();
    piController.objIO.green = new MockGpio();
  }
  piController.objIO.doorTime = Date.now(); //initialize door time
  return piController.objIO;
}

// returns closed (in use) or open (available) (same as objIO.OPEN objIO.CLOSED)
// room consitered in use when it has been in the new state for > 30 seconds
// expected to be called every 1000ms in server.js
function doorCheck() {
  //keep track of the current state
  const currentState = piController.objIO.OPEN;


    // if current is different than 

   
}

module.exports = piController;
