const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

const port = process.env.PORT || 3000;

const dbUrl = process.env.dbUrl;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba tortént', err);
})


app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.set('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
  }
  next();
})

const User = require('./models/user');

passport.use('local', new localStrategy({usernameField: 'email', passwordField: 'password'},function (email, password, done) {
  User.findOne({ email: email }, function (err, user) {
      if (err) return done('Hiba lekeres soran', null);
      if (!user) return done('Nincs ilyen email', null);
      user.comparePasswords(password, function (error, isMatch) {
          if (error) return done(error, false);
          if (!isMatch) return done('Hibas jelszo', false);
          return done(null, user);
      })
  })
}));

passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(expressSession({ secret: 'prfkotprogihopethisworksnow', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');



app.use("/",express.static(path.join(__dirname,"client")))



app.use('/api', routes);
app.use((req,res,next) => {
  res.sendFile(path.join(__dirname,"client","index.html"))
})
//app.use('/api/product', productRoutes);


app.listen(port, () => {
    console.log('The server is running!')
});
