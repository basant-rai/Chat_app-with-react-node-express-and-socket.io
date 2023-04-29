import express from 'express';
const router = express.Router();

const { getUsers } = require('../Controller/UserController')

const { verifyJWT } = require('../middleware/auth')

router.get('/users', verifyJWT, getUsers)

module.exports = router