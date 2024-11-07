const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const College = require('../models/College'); // Import the College model

// Admin Dashboard
router.get('/dashboard', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('pages/admin-dashboard');
});

// View All Colleges
router.get('/view-colleges', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const colleges = await College.find();
    res.render('pages/view-colleges', { colleges });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    req.flash('message', 'Failed to load colleges. Please try again later.');
    res.redirect('/admin/dashboard');
  }
});

// Add College
router.post('/add-college', async (req, res) => {
  const { name, location, courses, eligibilityCriteria } = req.body;
  const newCollege = new College({ name, location, courses: courses.split(','), eligibilityCriteria });
  await newCollege.save();
  req.flash('message', 'College added successfully');
  res.redirect('/admin/dashboard');
});

// Remove College
router.post('/remove-college', async (req, res) => {
  const { collegeId } = req.body;
  await College.findByIdAndDelete(collegeId);
  req.flash('message', 'College removed successfully');
  res.redirect('/admin/dashboard');
});

module.exports = router; 