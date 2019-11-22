var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var loginEnsure = require('connect-ensure-login');
var db = require('./db');


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.findUserByName(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
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
  cb(null, user.uid);
});

passport.deserializeUser(function(id, cb) {
  db.findUserById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// middleware to help serve static pages like css, js, images etc.
//https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/expenses');
  });

app.get('/signup', 
  function(req, res) {
    res.render('signup')
  }
)

app.post('/signup', 
  function(req, res) {
    // Add user to the database
    db.addUser(req.body.username, req.body.password, req.body.email, function(err, data){
      res.redirect('/login')
    })
    
  }
)
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.get('/expenses', 
  loginEnsure.ensureLoggedIn(),
  function(req, res){
    var expenses = db.getAllUserExpenses(req.user.name, function(err, data){
      // console.log(JSON.stringify(records[idX].expenses))
      res.render('expenses', { expenses: data})
    })
  }
)

// app.get('/expenses', 
//   loginEnsure.ensureLoggedIn(),
//   function(req, res) {
//     // get the date from req.params and return the data
//   }
// )

app.get('/expenses/:id',
  loginEnsure.ensureLoggedIn(),
  function(req, res){
    //fetch the particular expense of the session user from database and return it
  }  
)

app.put('/expenses/:id',
  loginEnsure.ensureLoggedIn(),
  function(req, res){
    //get req.body containing the entire expense object
    //update the db
    // send ok status
  }  
)

app.post('/expenses',
  loginEnsure.ensureLoggedIn(),
  function(req, res){
    console.log(req.body)
    // get the req.body containing desc, date(in correct format), category, and amount
    // get the user id from session data
    // save the expense in db
    // return success code with maybe expense id
    db.addUserExpense(req.user.name, req.body.description, req.body.amount,
       req.body.date, req.body.category, function(err, data){
        res.redirect('/expenses')
    })
    
  }
)

app.get('/incomes',
  loginEnsure.ensureLoggedIn(),
  function(req, res) {
    // get the income from req.params and return the data
  }
)


app.get('/materialize',
  function(req, res) {
    res.render('materialize')
  }
)


app.listen(4000);
