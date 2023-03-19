const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const jwt = require("jsonwebtoken");

const generateToken = (id, name, ispremium) => {
  return jwt.sign({ id: id, name: name, ispremium: ispremium }, "8770903047");
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).json([]);
    });
};

exports.setUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, saltrounds, (err, hash) => {
    User.create({
      name: name,
      email: email,
      password: hash,
    })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);

      });
  });
};

exports.deleteUser = (req, res, next) => {
  console.log("DELETE CALLED");

  console.log(req.body);
  id = req.body.id;
  console.log(id);
  User.deleteOne({ id: id })
    .then((result) => {
      res.status(200).json(result);
      console.log("Deleted User");
    })
    .catch((err) => {
      res.status(500).json([]);
    });
};

exports.loginUser = async (req, res, next) => {
  try {
    console.log("GET BY ID CALLED");
    email = req.body.email;
    password = req.body.password;
    result = await User.findOne({ email: email });

    console.log(result);
    if (result) {
      const response = await bcrypt.compare(password, result.password);
      response
        ? res
            .status(200)
            .json({
              msg: "Login Successfull",
              token: generateToken(
                result._id,
                result.name,
                result.ispremiumuser
              ),
            })
        : res.status(401).json("incorrect password");
    } else {
      res.status(404).send({ msg: "User don't exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server Error" });
  }
};
