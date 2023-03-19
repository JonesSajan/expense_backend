const uuid = require("uuid");
const Sib = require("sib-api-v3-sdk");
const bcrypt = require("bcrypt");
const {User} = require("../models/user");
const {Forgotpassword} = require("../models/forgotpassword");




const forgotpassword = async (req, res) => {
  try {

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.SIB_API_KEY;
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
      email: "jonessajan3000@gmail.com",
    };
    const receivers = [
      {
        email: req.body.email,
      },
    ];

    const { email } = req.body;
    const user = await User.findOne({ email:email });
    if (user) {
      const id = uuid.v4();
      result = await Forgotpassword.create(
        {
          active: true ,
          userId: user._id,
        },
      );
      // user.createForgotpassword({ id, active: true }).catch((err) => {
      //   throw new Error(err);
      // });


      tranEmailApi
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: "Email Verification",
          htmlContent: `<a href="http://localhost:3000/password/resetpassword/${result._id}">Reset password</a>`,
        })
        .then((response) => {
          console.log(response);

          return res.status(200).json({
            message: "Link to reset password sent to your mail ",
            sucess: true,
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err, sucess: false });
  }
};

const resetpassword = (req, res) => {
  // console.log("resetpassword called")
  const id =req.params.id;
  console.log(typeof id,id)
  Forgotpassword.findOne({_id: id }).then((forgotpasswordrequest) => {
    console.log(forgotpasswordrequest)
    if (forgotpasswordrequest) {
      forgotpasswordrequest.active= false ;
      forgotpasswordrequest.save();
      res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
  <title>Forgot Password</title>
</head>
<header id="main-header" class="bg-success text-white p-4 mb-3">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
            <h1 id="header-title">Forgot Password ?</h1>
        </div>

      </div>
    </div>
  </header>
  <div class="container">
   <div id="main" class="card card-body">
   <h2 class="title">Enter New Password -</h2>

                                    <form class="form-inline mb-3" action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input  class="form-control mr-2" name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`);
      res.end();
    }
  }).catch(err=>console.log(err));
};

const updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne({ _id: resetpasswordid } ).then(
      (resetpasswordrequest) => {
        User.findOne({ _id: resetpasswordrequest.userId}).then(
          (user) => {
            // console.log('userDetails', user)
            if (user) {
              //encrypt the password

              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                bcrypt.hash(newpassword, salt, function (err, hash) {
                  // Store hash in your password DB.
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  user.password= hash
                  user.save().then(() => {
                    res
                      .status(201)
                      .json({ message: "Successfuly update the new password" });
                  });
                });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  forgotpassword,
  updatepassword,
  resetpassword,
};
