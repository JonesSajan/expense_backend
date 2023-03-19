const {Expense} = require("../models/expense");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const AWS = require('aws-sdk')

// const uploadToS3 = async (data, filename) => {
//   console.log(
//     "//////////////////////////////////////////////////////////////////////uploadToS3 called"
//   );
//   const bucketName = "expensetracker-app";
//   const accessKey = process.env.IAM_ACCESS_KEY;
//   const secretAcessKey = process.env.IAM_SECRET_ACCESS_KEY;

//   let s3bucket = new AWS.S3({
//     accessKeyId: accessKey,
//     secretAccessKey: secretAcessKey,
//   });

//   var params = {
//     Bucket: bucketName,
//     Key: filename,
//     Body: data,
//     ACL: "public-read",
//   };

//   return new Promise((resolve, reject) => {
//     s3bucket.upload(params, (err, res) => {
//       console.log("******************************1***********************");
//       if (err) {
//         console.log("******************************2***********************");

//         console.log("something went wrong", err);
//         reject(err);
//       } else {
//         console.log("******************************3***********************");

//         console.log("success->", res.Location);
//         resolve(res.Location);
//       }
//     });
//   });
// };



// exports.downloadExpenses = async (req, res) => {
//   try {
//     console.log(
//       "///////////////////////////////////////////////////////////////////download expense called"
//     );
//     const expenses = await req.user.getExpenses();
//     console.log("//////////////////////////////////////////////////", expenses);
//     const stringified_expenses = JSON.stringify(expenses);
//     const filename = `expense${req.user.id}/${new Date()}.txt`;
//     const fileUrl = await uploadToS3(stringified_expenses, filename);
//     res.status(200).json({ fileUrl, sucess: true });
//   } catch (err) {
//     console.log("err from dowloadExpense ", err);
//     res.status(500).json({ fileUrl: "", sucess: false });
//   }
// };


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.getExpenses = async (req, res, next) => {
  try {
    result = await Expense.find({ userId: req.user.id } );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.getExpenseById = async (req, res, next) => {
  try {
    console.log("GET BY ID CALLED");
    id = req.body.id;
    result = await Expense.findOne({ _id: id });
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.setExpense = async (req, res, next) => {

  try {
    const expense_amount = req.body.expense_amount;
    const description = req.body.description;
    const category = req.body.category;
    const userid = req.user.id;

    result = await Expense.create(
      {
        expense_amount: expense_amount,
        description: description,
        category: category,
        userId: userid,
      },
    );

    const total_amount = parseInt(req.user.total_amount) + parseInt(req.body.expense_amount);
    req.user.total_amount = total_amount ;
    await req.user.save()
    res.status(200).json(result);
    console.log(result);
    return res;
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deleteExpense = async (req, res, next) => {

  try {
    console.log("DELETE CALLED");

    console.log(req.body);
    id = req.body.id;
    console.log(id);
    const expense = await Expense.findOne({
      _id: id, userId: req.user.id 
    });

    console.log(expense.expense_amount)

    const total_amount =
      parseInt(req.user.total_amount) -
      parseInt(expense.expense_amount);

    result = await Expense.deleteOne({ _id: id, userId: req.user.id });
    console.log(result);

    req.user.total_amount= total_amount
    req.user.save();
    res.status(200).json(result);
    console.log("DESTROYED Expense");
  } catch (err) {
    res.status(500).json([]);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
