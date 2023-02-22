const purchaseController = require('../controllers/purchase')
const express =require('express')
const auth =require('../middleware/auth')


const router = express.Router();

router.get('/premium',auth.authenticate,purchaseController.premium)
router.post('/updatetransaction',auth.authenticate,purchaseController.updateTransaction)


module.exports = router
