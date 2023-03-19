const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    user = jwt.verify(token, '8770903047');
    //console.log(JSON.stringify(user.id))

    User.findOne({_id:user.id})
      .then((user) => {
        //console.log(user);
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};


module.exports={authenticate};