const mongoose = require('mongoose');
const dbKeys = require('../../config/keys');

const startMongoose = () => {
  mongoose.connect(dbKeys.mongodb.dbURI);
  mongoose.connection.once('open', (error, client) => {
    console.log('Connected with MongoDB ORM - mongodb-orm');
  });
};

module.exports = startMongoose;

