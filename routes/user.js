const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.get('/users',userController.getUsers)
router.post('/adduser',userController.setUser)
router.post('/deleteuser',userController.deleteUser)


module.exports =router