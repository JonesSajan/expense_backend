const {User} =require('../models/user')


exports.getLeaderboard = async (req, res, next) => {
    try {
      const result = await User.find().sort({total_amount:-1})
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json([]);
    }
  };
  
