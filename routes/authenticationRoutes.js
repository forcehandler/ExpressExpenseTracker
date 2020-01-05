var express = require('express')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var loginEnsure = require('connect-ensure-login');

var router = express.Router()
var db = require('../db')


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function(username, password, cb) {
      db.Users.getUserbyName(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false, { message: 'Incorrect username.' }); }
        if (user.password != password) { return cb(null, false, { message: 'Incorrect password.' }); }
        return cb(null, user);
      });
    }));
  
  
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.Users.getUserById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  


router.get('/', function(req, res) { 
    // req.flash('info', 'Hi there!')
    res.render('home', { user: req.user, message: req.flash() })
})

router.get('/login',
  function(req, res){
    res.render('login', { message: req.flash() });
  });
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
      console.log("Logged in, Redirecting to expenses page!")
      console.log(req.user)
    res.redirect('/expenses');
  });

router.get('/signup', 
  function(req, res) {
    res.render('signup')
  }
)

router.post('/signup', 
  function(req, res) {
    // Add user to the database
    db.Users.insertUser(req.body.username, req.body.password, req.body.email, 0, function(err, data){
        if(err){

        }
        else { 
            res.redirect('/login');
        }
    })    
  }
)
  
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });



module.exports = router