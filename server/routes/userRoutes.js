const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create user with invitaiton code
/*router.post('/user/:invitationCode', (req, res) => {

});*/

// router.get('/')

router.get('/is-logged-in', (req, res) => {
  if (req.user) {
    res.send('true');
  } else {
    res.send('false');
  }
});

router.get('/logged_out', (req, res) => {
  res.send('logged out');
});

/*router.get('/user', (req, res) => {
  res.send('route reached');
});

router.post('/user', (req, res) => {
  console.log('reached');
  console.log(req.body);
  userController.createUser(req, res);
});*/

module.exports = router;