const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24*60*60*1000 // 30 minutes
  }
}));

app.use((req, res, next) => {
  console.log('Session ID:', req.session.id);
  console.log('User ID:', req.session.userId);
  next();
});

module.exports = app;