"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt-nodejs");

var userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  online: { type: Boolean, default: false }
});

userSchema.methods.hashPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('Users', userSchema);
