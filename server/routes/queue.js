var express = require('express');
const Session = require('../models/user');
var Q = express.Router();

Q.queue = [];

Q.get('/', (req, res) => {
  console.log(Q.queue);
  res.json(Q.queue);
});

Q.post('/push', (req, res) => {
  console.log('Q - push');
  if ('userId' in req.cookies) {
    const phone = ('phone' in req.body) ? req.body.phone : '';
    const userId = req.cookies.userId;
    Session.findOneAndUpdate({_id: userId}, {$set: {phone}}, {new: true}, (err, userDataArr) => {
      if (err) {
        res.send('err');
      } else {
        console.log("Phone");
        console.log(phone);
        const user = userDataArr;

        // if (Q.queue.indexOf(user) !== -1) {
        //   console.log('User Already exists in Queue');
        //   res.status(444).json('User already in Queue');
        //   return;
        // }
        for (let i = 0; i < Q.queue.length; i++) {
          if (Q.queue[i].id === user.id) {
            console.log('User already exists in Queue');
            res.status(444).json('User already in queue');
            return;
          }
        }

        Q.queue.push({
          id: user.id,
          username: user.username
        });
        res.json(Q.queue);
        return;
      }
    });
  }
});

Q.get('/pop', (req, res) => {
  if ('userId' in req.cookies) {
    const userId = req.cookies.userId;

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
  }
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
