
var User = require('../models/users.server.model.js');
var mongoose = require('mongoose');
var User = mongoose.model('Users');

exports.setOnline = function(username) {
  User.findOne({ username: username }, function(error, user) {
    if (error) {
      console.log('Internal server error!');
    } else {
      user.online = true;
      user.save(function(error, user) {
        if (error) {
          console.log('An error occured');
        } else {
          console.log('User is now online');
        }
      });
    }
  });
};

exports.setOffline = function(username) {
  User.findOne({ username: username }, function(error, user) {
    if (error) {
      console.log('Internal server error!');
    } else {
      user.online = false;
      user.save(function(error, user) {
        console.log(user);
        if (error) {
          console.log('An error occured');
        } else {
          console.log('User is now offline');
        }
      });
    }
  });
}