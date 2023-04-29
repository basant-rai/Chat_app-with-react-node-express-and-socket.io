const express = require('express');

const router = express.Router();

const { addMessage, getMessage, getMessageById, deleteMessage } = require('../Controller/MessageController')

const { verifyJWT } = require('../middleware/auth')


router.post('/send-message', verifyJWT, addMessage);
router.get('/messages', getMessage);
router.get('/messages/:conversation_id', getMessageById)
router.delete('/message/:_id', deleteMessage)

module.exports = router