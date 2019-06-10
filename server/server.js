var express = require("express");
var app = express();

const mockGpio = {
  value: 1,
  readSync() {
    return this.value;
  },
  writeSync(val) {
    this.value = val;
  }
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
  doorStatus: null
};

// for Production it will look at the actuall Pi 
// rest will use mockups driving by the ui
if (process.env === "production") {
  var onoff = require("onoff");
  const Gpio = onoff.Gpio;
  objIO.doorStatus = new Gpio(4, "in");
} else {
  objIO.doorStatus = mockGpio;
}

//check interval for changing door / LED values
const interval = setInterval(() => {
  var value = objIO.doorStatus.readSync();
  console.log("Door Value is:", value);
}, 1000);

app.get("/api/", (req, res) => {
    console.log("/api");
  const value = objIO.doorStatus.readSync();
  objIO.doorStatus.writeSync((value + 1) % 2);
  res.json("Allo!!!");
});

app.post("/door/open",(req,res)=> {
    console.log("/door/open");
    objIO.doorStatus.writeSync(OPEN)
    res.json("open")
})

app.post("/door/close",(req,res)=> {
    console.log("/door/close");
    objIO.doorStatus.writeSync(CLOSED)
    res.json("closed")
})

app.listen(3001);
console.log(`Listening on 3001`);
