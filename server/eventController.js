const Event = require('./models/event');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/fishBowlSmith';
mongoose.connect(mongoURI, err => {
  if (err) {
    console.log(`Database Error`);
    console.log(err);
  } else {
    console.log('DB Connected');
  }
});

const eventController = {};

eventController.createEvent = function(start, end) {
  const duration = end - start;
  const newEvent = new Event({start, end, duration});
  newEvent.save();
};

module.exports = eventController;
