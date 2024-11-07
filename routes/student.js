const express = require('express');
const router = express.Router();
const axios = require('axios');
const Test = require('../models/Test');
const User = require('../models/User');
const { ensureAuthenticated } = require('../middleware/auth');

// Student Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const tests = await Test.find({ userId: req.session.userId });
    const user = await User.findById(req.session.userId);
    res.render('pages/student-dashboard', { tests, user });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    req.flash('message', 'Failed to load dashboard. Please try again later.');
    res.redirect('/');
  }
});

// Aptitude Test Page
router.get('/aptitude-test', ensureAuthenticated, async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
    const questions = response.data.results;
    res.render('pages/aptitude-test', { questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    req.flash('message', 'Failed to load questions. Please try again later.');
    res.redirect('/student/dashboard');
  }
});

// Submit Aptitude Test
router.post('/submit-test', ensureAuthenticated, async (req, res) => {
  try {
    const { score } = req.body;
    const newTest = new Test({ userId: req.session.userId, score });
    await newTest.save();
    req.flash('message', 'Test submitted successfully');
    res.redirect('/student/dashboard');
  } catch (error) {
    console.error('Error saving test score:', error);
    req.flash('message', 'Failed to submit test. Please try again.');
    res.redirect('/student/aptitude-test');
  }
});

// Select Career
router.post('/select-career', ensureAuthenticated, (req, res) => {
  const { career } = req.body;
  req.flash('message', 'Career selected successfully.');
  res.redirect('/student/dashboard');
});

// Select College
router.post('/select-college', ensureAuthenticated, async (req, res) => {
  const { collegeId } = req.body;
  req.flash('message', 'College selected successfully.');
  res.redirect('/student/dashboard');
});

// Student Details Page
router.get('/details', ensureAuthenticated, (req, res) => {
  res.render('pages/student-details');
});

// Update Student Details
router.post('/update-details', ensureAuthenticated, async (req, res) => {
  const { name, cgpa, sop } = req.body;
  try {
    await User.findByIdAndUpdate(req.session.userId, { name, cgpa, sop });
    req.flash('message', 'Details updated successfully.');
    res.redirect('/student/dashboard');
  } catch (error) {
    console.error('Error updating details:', error);
    req.flash('message', 'Failed to update details. Please try again.');
    res.redirect('/student/details');
  }
});

module.exports = router; 