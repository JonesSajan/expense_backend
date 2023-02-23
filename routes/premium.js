const premiumController = require('../controllers/premium')
const express =require('express')
const auth =require('../middleware/auth')


const router = express.Router();

router.get('/showleaderboard',auth.authenticate,premiumController.getLeaderboard)


module.exports = router
