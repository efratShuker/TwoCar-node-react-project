const db = require("../models");
var bcrypt = require("bcryptjs");

const User = db.User;

//return the whole users in db
exports.findAll = (req, res) => {
  User.find()
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "some error occurred while retrieving Users."
      });
    });
};

//return user details by id
exports.findOne = (req, res) => {
  User.findById(req.query.id)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "משתמש לא נמצא" });
      }

      res.status(200).send({
        id:user._id,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userEmail: user.userEmail,
        userPassword: user.userPassword,
        userPhone: user.userPhone
      });
    });
};


//update user by id
exports.update = (req, res) => {
  if (!req.body.userFirstName || !req.body.userLastName || !req.body.userPhone || !req.body.userEmail) {
    return res.status(400).send({
      message: "user content can not be empty"
    });
  }
  User.findOne({
    userEmail: req.body.userEmail
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      var idCompare = (req.query.id == user.id)
      if (!idCompare) {
        res.status(404).send({ message: "משתמש עם המייל זה כבר קיים" })
        return
      }
    }

    let detailsNew = {}
    if(req.body.userPassword){
      detailsNew = {...req.body, userPassword: bcrypt.hashSync(req.body.userPassword, 8)}
    }
    else{
      detailsNew = req.body
    }

  User.findByIdAndUpdate(req.query.id, detailsNew , { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "משתמש לא נמצא"
        });
      }
      res.send({message: ""});
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "משתמש לא נמצא"
        });
      }
    });
  });
};
