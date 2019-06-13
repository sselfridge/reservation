var express = require('express');
const User = require('../models/user');
var Q = express.Router();

Q.queue = [];

Q.get('/', (req, res) => {
  console.log(Q.queue);
  res.json(Q.queue);
});

Q.post('/push', (req, res) => {
  const userId = req.user.id;
  User.find({ id: userId }, (err, data) => {
    if (err) {
      res.send('err');
    } else {
      // console.log(Q.queue);
      // const user = req.params.user;

      // if (Q.queue.indexOf(user) !== -1) {
      //   console.log('User Already exists in Queue');
      //   res.status(444).json('User already in Queue');
      //   return;
      // }
      for (let i = 0; i < Q.queue.length; i++) {
        if (Q.queue.id === data.id) {
          console.log('User already exists in Queue');
          res.status(444).json('User already in queue');
        }
      }

      Q.queue.push(data);
      res.json(Q.queue);
    }
  });
});

Q.post('/push/:user', (req, res) => {
  console.log(Q.queue);
  const user = req.params.user;

  if (Q.queue.indexOf(user) !== -1) {
    console.log('User Already exists in Queue');
    res.status(444).json('User already in Queue');
    return;
  }

  Q.queue.push(user);
  res.json(Q.queue);
});

Q.get('/pop', (req, res) => {
  console.log(Q.queue);
  if (Q.queue.length === 0) {
    res.status(414).json('Queue Empty');
    return;
  }
  const data = {
    user: Q.queue.shift(),
    queue: Q.queue,
  };
  res.json(data);
});

Q.post('/remove/:user', (req, res) => {
  console.log(Q.queue);
  const user = req.params.user;
  for (let i = 0; i < Q.queue.length; i++) {
    const element = Q.queue[i];
    if (element === user) {
      Q.queue.splice(i, 1);
      res.json(Q.queue);
      return;
    }
  }
  //user not in Q.queue, return error code
  res.status(444).json(Q.queue);
});

module.exports = Q;
