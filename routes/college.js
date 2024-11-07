const express = require('express');
const router = express.Router();
const College = require('../models/College');

// College List Page for Students
router.get('/list', async (req, res) => {
  try {
    const colleges = await College.find(); // Fetch colleges from the database
    res.render('pages/college-list', { colleges });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    req.flash('message', 'Failed to load colleges. Please try again later.');
    res.redirect('/');
  }
});

// College Registration Page
router.get('/register', (req, res) => {
  res.render('pages/college-register');
});

// Handle College Registration
router.post('/register', async (req, res) => {
  const { name, location, courses, eligibilityCriteria } = req.body;
  try {
    const newCollege = new College({ name, location, courses: courses.split(','), eligibilityCriteria });
    await newCollege.save();
    req.flash('message', 'College registered successfully');
    res.redirect('/college/list');
  } catch (error) {
    console.error('Error registering college:', error);
    req.flash('message', 'Failed to register college. Please try again.');
    res.redirect('/college/register');
  }
});

module.exports = router; 