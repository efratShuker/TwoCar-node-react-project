const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//sign in to app
exports.signin = (req, res) => {
  //check if user exists
  User.findOne({
    userEmail: req.body.userEmail
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "עדיין לא נרשמת" });
      }

      //check if password match email
      var passwordIsValid = bcrypt.compareSync(
        req.body.userPassword,
        user.userPassword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "המייל והסיסמה אינם תואמים"
        });
      }

      //update the token
      var token = jwt.sign({
        id: user.id,
        userFirstName: user.userFirstName
      }, config.secret, {
        expiresIn: 43200 // 12 hours
      });

      //return user details
      res.status(200).send({
        id: user._id,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userPassword: user.userPassword,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        accessToken: token
      });
    });
};

//sign up to app
exports.signup = (req, res) => {
  //check if user is not exist
  User.findOne({
    userEmail: req.body.userEmail
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        return res.status(404).send({ message: "הינך רשום כבר עם כתובת מייל זאת, עליך להתחבר" });
      }

      if (!req.body) {
        return res.status(400).send({
          message: "אחד הרטים חסר או לא עומד בדרישות"
        });
      }

      //create a user Schema
      const newuser = new User({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
        userPassword: bcrypt.hashSync(req.body.userPassword, 8)
      });

      //save the new user
      newuser.save((err) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        else{
          res.status(200).send({message: ""})
        }
      });
    });
};
