var path = require("path");

exports.index = function(req, res){
  res.render('index', { title: "Login Page"});
};

exports.userPage = function(req, res){
  res.render('userPage', {title: "User Page"});
};