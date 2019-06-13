const loginController = {};

loginController.isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.redirect('/api/unauthorized');
  }
};

module.exports = loginController;