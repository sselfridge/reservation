const loginController = {};

loginController.isLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log(req.user.id);
    const userId = req.user.id;
    res.cookie('userId', userId);
    return next();
  } else {
    return res.redirect('/api/unauthorized');
  }
};

module.exports = loginController;