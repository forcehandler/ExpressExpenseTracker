var express = require('express');
var passport = require('passport');

var users = require('./routes/userRoutes')
var categories = require('./routes/categories')
var expenses = require('./routes/expenseRoutes')
var authentication = require('./routes/authenticationRoutes')
var flash = require('connect-flash')


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
app.use(flash());

app.use('/users', users)
app.use('/categories', categories)
app.use('/expenses', expenses)
app.use('/', authentication)


data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 15]
  }]
}


app.get('/testchart', function(req, res){
  res.send(data)
})

app.get('/chart',
  function(req, res) {
    res.render('chart', {data: "fdsa"})
  }
)


app.listen(4000);
