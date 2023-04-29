const mongoose = require('mongoose')

const conversation_schema = mongoose.Schema({
  // users: {
  // type: Array
  users: [{
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
  }],
  // },
  latest_message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message_Model",
  },
  read_at: {
    type: Date,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model("Conversation", conversation_schema)