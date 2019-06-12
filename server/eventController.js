const Event = require('./models/event');
const mongoose = require('mongoose');
const DB = require('./DB_CONFIG');

const mongoURI = DB.mongoURI;
mongoose.connect(mongoURI, { useNewUrlParser: true },err => {
  if (err) {
    console.log(`Database Error`);
    console.log(err);
  } else { 
    console.log('DB Connected');
  }
});


const eventController = {};

eventController.createEvent = function(eventObj) {
  const start = eventObj.start;
  const end = eventObj.end;
  const duration = end - start;
  const newEvent = new Event({ start, end, duration });
  newEvent.save();
  console.log(`Event Created`);
};

module.exports = eventController;
