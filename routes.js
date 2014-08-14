var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('./models/account');
var Status = require('./models/status');

module.exports = function (app) {
    
  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });
  // REGISTER ========================================================================================
  app.post('/register', function(req, res) {
      Account.register(new Account({ username : req.body.username }), 
        req.body.password, function(err, account) {
          if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
          }
          passport.authenticate('local')(req, res, function () {
            res.redirect('/userPage');
          });
      });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  //LOGIN =========================================================================
  // process the login form
  /*app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/userPage');
  });*/
  
  //or,
  app.post('/login', passport.authenticate('local', {
    successRedirect : '/userPage', // redirect to the user page
    failureRedirect : '/login' // redirect back to the login page if there is an error
    
  }));


  app.get('/userPage', function(req, res){
      Status.find( function (err, statuses){
          //console.log('status: ' + statuses);
          res.render('userPage', {
              user:req.user,
              // sending this statusesObj to html page
              statusesObj: statuses
          });
      });

      //res.render('userPage', {user: req.user})
  })


  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


  app.get('/status', function(req,res){
      Status.find( function (err, statuses){
          //console.log('status: ' + statuses);
          res.render('status', {
              // sending this statusesObj to html page
              statusesObj: statuses
          });
      });
  });

  // POSTING a new status =========================================================
  app.post('/status', function(req, res){
      var status = req.body.statuscontent;
      var statusData = {content: status};
      console.log('status content is ' + statusData.content);

      var newStatus = new Status(statusData).save(function (err){
          if(!err) {
              console.log('new status is posted: '+ statusData.content);
          }else console.log('error in posting status');
      });
      res.redirect('/userPage');

  });
     
};

  
