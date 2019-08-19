const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltIter = parseInt(process.env.SaltIter);

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/*
  Error Codes
  PS00: Generating Salt Error
  PS01: Generating Hash Error
*/

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) next();
  bcrypt.genSalt(saltIter, (err, salted) => {
    if (err) return next(new Error("Something went wrong. ErrCode: PS00"));
    bcrypt.hash(this.password, salted, (err, hashed) => {
      if (err) return next(new Error("Something went wrong. ErrCode: PS01"));
      this.password = hashed;
      next();
    });
  });
});

module.exports = User = mongoose.model("User", UserSchema);
