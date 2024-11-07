const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  courses: [String],
  eligibilityCriteria: String
});

module.exports = mongoose.model('College', collegeSchema); 