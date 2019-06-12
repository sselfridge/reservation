const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const helmet = require('helmet');
const keys = require('../config/keys.js');
const mongooseStart = require('./bin/mongoose');
const passportSetup = require('./services/passport');
const path = require('path');


mongooseStart();

const app = express();
// app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [keys.session.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

// app.use('/profile', profileRoutes);

const Q = require('./routes/queue')
const events = require('./routes/events')

const pi = require('./piController');
const eventController = require('./eventController');

app.use('/queue',Q)
app.use('/events',events)

app.use(express.static(path.join(__dirname, '../build')));

let roomInUse = false;
const eventObj = {
  start: null,
  end: null,
};

const CURRENT_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'dev';
const objIO = pi.setupIO();
// ONLY USE THE GET ROUTES WITH objIO mentioned in them
// NOT THE POST ROUTES

// turn off all the lights every 5min
const turnOffTheLights = setInterval(() => {
  pi.turnOffLED('green');
  pi.turnOffLED('yellow');
  pi.turnOffLED('red');
}, 300000);

//check interval for changing door / LED values
const interval = setInterval(() => {
  // console.log(pi.ioStatus());

  const doorStatus = pi.doorCheck();
  if (doorStatus === objIO.CLOSED) {
    if (roomInUse === false) {
      pi.turnOnLED('green', 1000);
      roomInUse = true;
      eventObj.start = Date.now();
      console.log('Event Started');
    }
  } else {
    if (roomInUse === true) {
      pi.turnOnLED('green', 1000);
      roomInUse = false;
      eventObj.end = Date.now();
      console.log('Event End');
      if (eventObj.start) eventController.createEvent(eventObj);

      eventObj.start = null;
      eventObj.end = null;
    }
  }
}, 1000);

app.get('/api/', (req, res) => {
  console.log('/api');
  const value = objIO.doorStatus.readSync();
  objIO.doorStatus.writeSync(value ^ 1);
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

  const newStatus = led.readSync() ^ 1;
  led.writeSync(newStatus);
  res.json(newStatus);
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

// blink color DEV only
// turns off after
app.post('/led/blink/:color/:time', (req, res) => {
  console.log(`/led/blink/:color/:time`);
  const color = req.params.color;
  const time = parseInt(req.params.time);
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
