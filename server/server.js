const express = require('express');
var app = express();
const path = require('path');
const MockGpio = require('./MockGpio');

app.use(express.static(path.join(__dirname, '../build')));

//constants for the door values
const OPEN = 1;
const CLOSED = 0;

//constants for LED values
const ON = 1;
const OFF = 0;

//obj that will have the current status of all IO bits
const objIO = {
  red: null,
  yellow: null,
  green: null,
  doorStatus: null,
};

const CURRENT_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'dev';

// for Production it will look at the actuall Pi
// rest will use mockups driven by the ui
// prettier-ignore
if (CURRENT_ENV === 'production') {
  var onoff = require('onoff');
  const Gpio = onoff.Gpio;
  objIO.doorStatus =  new Gpio(4, 'in');
  objIO.red =         new Gpio(17, 'out');
  objIO.yellow =      new Gpio(27, 'out');
  objIO.green =       new Gpio(22, 'out');
} else {
  objIO.doorStatus = new MockGpio();
  objIO.red = new MockGpio();
  objIO.yellow = new MockGpio();
  objIO.green = new MockGpio();
}

//check interval for changing door / LED values
const interval = setInterval(() => {
  const door = objIO.doorStatus.readSync();
  const red = objIO.red.readSync();
  const yellow = objIO.yellow.readSync();
  const green = objIO.green.readSync();
  console.log(`Door: ${door} -- red:${red} -- yellow:${yellow} -- green:${green}`);
}, 1000);

app.get('/api/', (req, res) => {
  console.log('/api');
  const value = objIO.doorStatus.readSync();
  objIO.doorStatus.writeSync((value + 1) % 2);
  res.json('Allo!!!');
});

app.get('/door', (req, res) => {
  console.log(`/door`);
  res.json(objIO.doorStatus.readSync());
});

app.post('/door/:status', (req, res) => {
  console.log(`/door/:status`);
  const status = req.params.status;
  let newValue;
  if (status === 'open') {
    newValue = OPEN;
  } else if (status === 'close') {
    newValue = CLOSED;
  } else {
    console.error(`Invalid door command. open / close is valid. Found: ${status}`);
    res.status(400).send();
  }
  objIO.doorStatus.writeSync(newValue);
  res.json('done');
});

app.get('/led/:color', (req, res) => {
  console.log(`/led/:color`);
  const color = req.params.color;
  console.log(`Color:${color}`);

  let led;
  if (color === 'red') {
    led = objIO.red;
  } else if (color === 'yellow') {
    led = objIO.yellow;
  } else if (color === 'green') {
    led = objIO.green;
  } else {
    console.log('Invalid color');
    res.status(402).json(`Invalid color ${color}.  Valid colors: red,yellow,green`);
    return;
  }

  res.json(led.readSync());
});

app.post('/led/:color', (req, res) => {
  console.log(`/led/:color`);
  const color = req.params.color;

  let led;
  if (color === 'red') {
    led = objIO.red;
  } else if (color === 'yellow') {
    led = objIO.yellow;
  } else if (color === 'green') {
    led = objIO.green;
  } else {
    console.log('Invalid color');
    res.status(402).json(`Invalid color ${color}.  Valid colors: red,yellow,green`);
    return;
  }

  const newStatus = (led.readSync() + 1) % 2;
  led.writeSync(newStatus);
  res.json(newStatus);
});

//only need this to host the static files if we're running on the pi
if (CURRENT_ENV === 'production') {
  app.get('/', function(req, res) {
    if (req.session) {
      console.log(req.session);
    }
    res.sendFile(path.join(__dirname + '/../build/index.html'));
  });
}

// catch all 404 function
app.use(function(req, res) {
  res.status(404).json("Something broke! Check url and try again?")
});

const port = CURRENT_ENV === 'production' ? 5000 : 3001;

app.listen(port);
console.log(`Listening on ${port}`);
