const express = require("express");
const router = express.Router();

const { signIn, addUser,authUser } = require('../Controller/Auth/AuthController')

const { verifyJWT } = require('../middleware/auth')


router.post('/login', signIn)
router.post('/register', addUser)
router.get('/auth-user', verifyJWT,authUser)

module.exports = router
