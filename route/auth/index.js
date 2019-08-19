const api = require("express").Router();
const User = require("../../models/User");

api.route("/register").post((req, res) => {
  const { firstname, lastname, email, password, password1 } = req.body;

  if ((!firstname, !lastname, !email, !password, !password1))
    return res.status(204).json({ msg: "Please fill all fields." });

  if (password !== password1)
    return res.status(204).json({ msg: "Password must matched." });

  /*
    Error Codes
    RE00 - Error in Finding email
    RE01 - Error in Creating New User
  */

  User.findOne({ email }, (err, result) => {
    if (err) {
      return res.status(400).json({
        msg: "Something went wrong, Please contact admin. ErrCode: RE00"
      });
    }
    if (result) {
      return res.status(409).json({ msg: "Email is already been used." });
    }

    let newUser = new User({ firstname, lastname, email, password });

    newUser.save(err => {
      if (err) {
        return res.status(400).json({
          msg: "Something went wrong, Please contact admin. ErrCode: RE01"
        });
      }
      newUser = newUser.toObject();
      delete newUser.password;
      res.status(200).json({
        msg: "User Created Successfully.",
        data: newUser
      });
    });
  });
});

module.exports = api;
