const express = require('express')
const router = express.router()
const userController = require('../controller/userController')

router.Post('/register',userController.createUser)

module.exports = router
