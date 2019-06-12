const DB = {
  mongoURI1: 'mongodb+srv://dbuser:',
  mongoURI2: '@cluster0-5eov3.mongodb.net/test?retryWrites=true&w=majority',
  password: 'password',
};

DB.mongoURI = `${DB.mongoURI1}${DB.password}${DB.mongoURI2}`

module.exports = DB;