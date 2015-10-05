
// user authentication controller file
require('../models/users.server.model.js');
var mongoose = require('mongoose');
var utility = require("./utility.user.server.controller.js");
var User = mongoose.model('Users');

// function to be called when user successfully connects to server
exports.ack = function(server) {
  console.log('Client connected...');
  server.username = null;

  server.on('sign_up', function(data) {

    // check if user is signed up already
    User.findOne({ username: data.username }, function(error, user) {
      if (error) {
        server.emit('auth_error', { message: 'Internal server error' });
      } else {
        if (user) {
          // user exists already, notify client that user
          server.emit('user_exists', { message: 'username in use' });
        } else {
          // user does not exists, create new user
          var user = new User();
          user.name = data.name;
          user.username = data.username;
          user.hashPassword(data.password);
          user.save(function(error, user) {
            if (error) {
              console.log('SignUp');
              server.emit('sign_up_error', { message: 'internal server error' });
            } else {
              server.emit('sign_up_success', { message: 'signup successful' });
            }
          });
        }
      }
    });
  });

  server.on('sign_in', function(data) {
    // try logging user in
    User.findOne({ username: data.username }, function(error, user) {
      if (error) {
        server.emit('auth_error', error);
      } else {
        if (!user) {
          server.emit('user_not_exist', { message: 'username does not exist' });
        } else {
          // check for password
          if (user.comparePassword(data.password)) {
            // password is correct, log user in
            // build object and send back to frontend
            var userObject = {
              username: user.username,
              name: user.name
            };
            // add to socket object and also add to mongoDb as online
            server.username = user.username;
            utility.setOnline(user.username);
            server.emit('login_success', userObject);
          } else {
            server.emit('wrong_password', { message: 'password incorrect' });
          }
        }
      }
    });
  });
};

exports.disconnect = function(server) {
  // make offline
  utility.setOffline(server.username);
}



