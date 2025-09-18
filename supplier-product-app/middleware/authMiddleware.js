exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash('error_msg', 'Please login');
    res.redirect('/auth/login');
  }
};