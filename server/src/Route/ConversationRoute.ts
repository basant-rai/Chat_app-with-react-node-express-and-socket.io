const express = require("express");
const router = express.Router();

const { getConversation, startConversation, startChat, getConversationByUserId, seenMessage } = require('../Controller/ConversationController')

const { verifyJWT } = require('../middleware/auth')

router.get('/conversations', verifyJWT, getConversation);
router.get('/conversations/:id', verifyJWT, getConversationByUserId);
router.post('/new-conversation', verifyJWT, startChat);
router.post('/seen-message/:id', seenMessage),

  module.exports = router