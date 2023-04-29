import { Request, Response } from 'express'

const Message = require('../Model/MessageModel')
const Conversation = require('../Model/ConversationModel')


exports.addMessage = async (req: any, res: Response) => {
  let message = new Message({
    content: req.body.content,
    sender: req.user._id,
    conversation_id: req.body.conversation_id
  })

  await message.save()
  const populatedMessage = await Message.findById(message._id).populate('sender', '-hashed_password -isVerified -role -salt -email');
  await Conversation.findByIdAndUpdate(req.body.conversation_id, { latest_message: populatedMessage }, { read_at: 'aaaaaa'});

  if (!message) {
    return res.status(400).json({ error: "Mesage not saved" })
  }
  return res.send(populatedMessage)
  // }rs
}

exports.getMessage = async (req: Request, res: Response) => {
  let messages = await Message.find();
  if (!messages) {
    return res.status(400).json({ error: "something went wrong" })
  }
  return res.send(messages)
}

exports.getMessageById = async (req: Request, res: Response) => {
  let conversation = await Message.find({ conversation_id: req.params.conversation_id }).populate('sender', "-hashed_password -isVerified -role -salt -email",)

  if (!conversation) {
    return res.json({ message: "Not found" })
  } else {
    return res.send(conversation)
  }

}

exports.deleteMessage = async (req: Request, res: Response) => {
  let message = await Message.findByIdAndRemove({ _id: req.params._id })
  if (!message) {
    return res.status(400).json({ error: 'Message not found' })
  } else {
    return res.status(200).json({ message: 'Message Delete Successfully' })
  }

}