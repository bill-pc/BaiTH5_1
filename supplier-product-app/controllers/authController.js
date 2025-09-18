const User = require('../models/User');
const crypto = require('crypto');

exports.getRegister = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    req.flash('error_msg', 'Username taken');
    return res.redirect('/auth/register');
  }
  await User.create({ username, password, email, phone });
  req.flash('success_msg', 'Registered successfully. Please login.');
  res.redirect('/auth/login');
};

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    req.flash('error_msg', 'Invalid credentials');
    return res.redirect('/auth/login');
  }
  req.session.user = user;
  req.flash('success_msg', 'Logged in');
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.getForgot = (req, res) => {
  res.render('auth/forgot');
};

exports.forgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    req.flash('error_msg', 'No user with that email');
    return res.redirect('/auth/forgot');
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
  await user.save();
  console.log(`Reset link: /auth/reset/${token}`); // Simulate email
  req.flash('success_msg', 'Reset link sent (check console)');
  res.redirect('/auth/login');
};

exports.getReset = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiration: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error_msg', 'Invalid or expired token');
    return res.redirect('/auth/forgot');
  }
  res.render('auth/reset', { token: req.params.token });
};

exports.reset = async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiration: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error_msg', 'Invalid or expired token');
    return res.redirect('/auth/forgot');
  }
  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();
  req.flash('success_msg', 'Password reset');
  res.redirect('/auth/login');
};