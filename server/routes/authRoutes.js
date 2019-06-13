const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: [ 'profile', 'email' ]
}));

/*router.get('/google/callback', passport.authenticate('google', (req, res) => {
  res.redirect('/');
}));*/

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/logged_out');
});

module.exports = router;