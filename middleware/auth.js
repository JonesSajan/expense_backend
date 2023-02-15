const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    user = jwt.verify(token, '8770903047');
    console.log(JSON.stringify(user.id))

    User.findByPk(user.id)
      .then((user) => {
        console.log(user);
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

const addexpense = (req, res, next) => {
    try {
      const token = req.body.id;
  
      user = jwt.verify(token, '8770903047');
      console.log(JSON.stringify(user.id))
  
      User.findByPk(user.id)
        .then((user) => {
          console.log(user);
          req.body.id = user.id;
          next();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

module.exports={authenticate,addexpense};