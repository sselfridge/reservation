const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys.js');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  // null in error position
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: '/auth/google/callback',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already in db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // create new user in db
          new User({
            username: profile.displayName,
            googleId: profile.id,
            // email: profile.emails[0].value,
            // username: profile.displayName,
            // googleId: profile.id,
            // familyName: profile.name.familyName,
            // givenName: profile.name.givenName
          })
            .save()
            .then(newUser => {
              console.log('new user created: ', newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
