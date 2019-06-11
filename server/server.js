const express = require('express');
var app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

const mockGpio = {
  value: 1,
  readSync() {
    return this.value;
  },
  writeSync(val) {
    this.value = val;
  },
};

//constants for the door values
const OPEN = 1;
const CLOSED = 0;

//constants for LED values
const ON = 1;
const OFF = 0;

//obj that will have the current status of all IO bits
const objIO = {
  red: OFF,
  yellow: OFF,
  green: OFF,
  doorStatus: null,
};

const CURRENT_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'dev';

// for Production it will look at the actuall Pi
// rest will use mockups driving by the ui
if (CURRENT_ENV === 'production') {
  var onoff = require('onoff');
  const Gpio = onoff.Gpio;
  objIO.doorStatus = new Gpio(4, 'in');
} else {
  objIO.doorStatus = mockGpio;
}

//check interval for changing door / LED values
const interval = setInterval(() => {
  var value = objIO.doorStatus.readSync();
  console.log('Door Value is:', value);
  console.log(`ENV: ${CURRENT_ENV}`);
  console.log(path.join(__dirname + '/../build/index.html'));
}, 1000);

app.get('/', function(req, res) {
  if (req.session) {
    console.log(req.session);
  }
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.get('/api/', (req, res) => {
  console.log('/api');
  const value = objIO.doorStatus.readSync();
  objIO.doorStatus.writeSync((value + 1) % 2);
  res.json('Allo!!!');
});

app.post('/door/open', (req, res) => {
  console.log('/door/open');
  objIO.doorStatus.writeSync(OPEN);
  res.json('open');
});

app.post('/door/close', (req, res) => {
  console.log('/door/close');
  objIO.doorStatus.writeSync(CLOSED);
  res.json('closed');
});

const port = CURRENT_ENV === 'production' ? 5000 : 3001;

app.listen(port);
console.log(`Listening on ${port}`);
