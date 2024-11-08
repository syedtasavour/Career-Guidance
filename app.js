require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const MongoStore = require('connect-mongo');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session and Flash
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  })
}));
app.use(flash());

// Custom middleware to expose session to views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Home Route
app.get('/', (req, res) => {
  res.render('pages/home');
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const collegeRoutes = require('./routes/college');
app.use('/college', collegeRoutes);
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);
const studentRoutes = require('./routes/student');
app.use('/student', studentRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 