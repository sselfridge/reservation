const mongoose = require('mongoose');
const dbKeys = require('../../config/keys');

const startMongoose = () => {
  mongoose.connect(dbKeys.mongoURI, { useNewUrlParser: true });
  mongoose.connection.once('open', (error, client) => {
    console.log('DB Connected');
  });
};

module.exports = startMongoose;

