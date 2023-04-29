const mongoose = require('mongoose');

const message_schema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim:true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
}, { timestamps: true })

module.exports = mongoose.model('Message_Model', message_schema)