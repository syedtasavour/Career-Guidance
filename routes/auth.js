const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Middleware to redirect logged-in users
function redirectIfLoggedIn(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/');
  }
  next();
}

// Login Page
router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('pages/login', { message: req.flash('message') });
});

// Register Page
router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('pages/register', { message: req.flash('message') });
});

// Handle Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    // Automatically log in the user after registration
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.username = user.username;
    req.flash('message', 'Registration successful. You are now logged in.');
    res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  } catch (error) {
    req.flash('message', 'Registration failed. Username may already be taken.');
    res.redirect('/auth/register');
  }
});

// Handle Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.username = user.username;
    req.flash('message', 'Login successful.');
    return res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  }
  req.flash('message', 'Invalid username or password.');
  res.redirect('/auth/login');
});

// Handle Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

module.exports = router; 