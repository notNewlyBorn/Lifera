// dependencies
var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// initialize app
var app = express();

// main config
app.set('port', process.env.PORT || 1337); // set port
app.set('views', __dirname + '/views'); // set views directory
app.set('view engine', 'jade'); // set default view engine
//app.set('view cache', true); or, app.enable('view cache');
//app.set('view options', { layout: false });

// Middleware runs between request and routes. need to maintain order
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (needed for auth)

// for passport
app.use(session({ secret: 'thisissecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//app.use(app.router);


// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// status model config
var Status = require('./models/status');

// mongoose connect, providing mongodb URL
//mongoose.connect('mongodb://localhost/passport_local_mongoose');
mongoose.connect('mongodb://nafis:thezoo20@ds045099.mongolab.com:45099/passport_local_mongoose');


// routes
require('./routes')(app);

var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.listen(app.get('port'), function(){
  console.log(("Express server listening on port " + app.get('port')))
});
