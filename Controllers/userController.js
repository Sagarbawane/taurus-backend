const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

userController.login = (req, res) => {
  const body = req.body;
  console.log(body.username);
  User.findOne({ username: body.username })

    .then((user) => {
      console.log(user);
      if (user) {
        console.log(body.password);
        console.log(user.password);
        bcryptjs.compare(body.password, user.password).then((result) => {
          console.log(result);
          if (result) {
            const tokenData = {
              id: user._id,
            };
            const token = jwt.sign(tokenData, "taurusoach", {
              expiresIn: "2d",
            });
            res.json({
              token: token,
            });
            console.log(token);
          } else {
            res.json({ errors: "Invalid UserName Or Password" });
          }
        });
      } else {
        res.json({ errors: "Invali UserName Or Password" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = userController;
