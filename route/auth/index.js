const api = require("express").Router();
const User = require("../../models/User");

/*
    Error Codes
    RE00 - Error in Finding email (Register)
    RE01 - Error in Creating New User
    LE00 - Error in Finding email (Login)
*/

api.route("/register").post((req, res) => {
  const { firstname, lastname, email, password, password1 } = req.body;

  if ((!firstname, !lastname, !email, !password, !password1))
    return res
      .status(200)
      .json({ notif: { type: "warning", message: "Please fill all fields." } });

  if (password !== password1)
    return res
      .status(200)
      .json({ notif: { type: "warning", message: "Password must match." } });

  User.findOne({ email }, (err, result) => {
    if (err) {
      return res.status(200).json({
        notif: {
          type: "danger",
          message: "Somethin went wrong, Please contact admin! ErrCode: RE00"
        }
      });
    }
    if (result) {
      return res
        .status(200)
        .json({ notif: { type: "danger", message: "Email already taken!" } });
    }

    let newUser = new User({ firstname, lastname, email, password });

    newUser.save(err => {
      if (err) {
        return res.status(200).json({
          notif: {
            type: "danger",
            message: "Somethin went wrong, Please contact admin! ErrCode: RE01"
          }
        });
      }
      newUser = newUser.toObject();
      delete newUser.password;
      res.status(200).json({
        notif: {
          type: "success",
          message: "Successfully Created User. You'll be redirected to Login!"
        },
        data: newUser
      });
    });
  });
});

api.route("/login").post((req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, result) => {
    if (err) {
      return res.status(200).json({
        notif: {
          type: "danger",
          message: "Something went wrong, Please contact admin! ErrCode:LE00 "
        }
      });
    }
    if (!result) {
      return res.status(200).json({
        notif: {
          type: "danger",
          message: "Email/Password is incorrect."
        }
      });
    }

    result.comparePass(password).then(isMatch => {
      if (!isMatch) {
        return res.status(200).json({
          notif: { type: "danger", message: "Email/Password is incorrect." }
        });
      }
      result = result.toObject();
      delete result.password;
      res.status(200).json({
        notif: {
          type: "success",
          message: `Welcome back ${result.firstname}!`
        },
        data: result
      });
    });
  });
});

module.exports = api;
