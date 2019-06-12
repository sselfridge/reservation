const express = require('express');
var app = express();
const path = require('path');

const pi = require('./piController');

app.use(express.static(path.join(__dirname, '../build')));

const roomInUse = false;
const queue = [];

const CURRENT_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'dev';
const objIO = pi.setupIO();
// ONLY USE THE GET ROUTES WITH objIO mentioned in them

//check interval for changing door / LED values
const interval = setInterval(() => {
  console.log(pi.ioStatus());
  console.log(`Door Check:`, pi.doorCheck());
}, 1000);

app.get('/api/', (req, res) => {
  console.log('/api');
  const value = objIO.doorStatus.readSync();
  objIO.doorStatus.writeSync((value + 1) % 2);
  res.json('Allo!!!');
});

// get current door status
app.get('/door', (req, res) => {
  console.log(`/door`);
  res.json(objIO.doorStatus.readSync());
});

// change door status DEV only
app.post('/door/:status', (req, res) => {
  console.log(`/door/:status`);
  const status = req.params.status;
  let newValue;
  if (status === 'open') {
    newValue = objIO.OPEN;
  } else if (status === 'close') {
    newValue = objIO.CLOSED;
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

// change color DEV only
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

  const newStatus = led.readSync() ^ 1;
  led.writeSync(newStatus);
  res.json(newStatus);
});

// change color DEV only
app.post('/led/blink/:color/:time', (req, res) => {
  console.log(`/led/blink/:color/:time`);
  const color = req.params.color;
  const time = req.params.time;
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
  console.log(`Time: ${time}`);
  if (Number.isInteger(time) && time > 0) {
    pi.blinkLED(color, time);
  } else {
    console.log('Invalid color');
    res.status(402).json(`Invalid time ${time}. Must be positive integer`);
    return;
  }

  res.json('done');
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
  res.status(404).json('Something broke! Check url and try again?');
});

//other catch all, might be better error reporting
app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error });
});

const port = CURRENT_ENV === 'production' ? 5000 : 3001;

app.listen(port);
console.log(`Listening on ${port}`);
