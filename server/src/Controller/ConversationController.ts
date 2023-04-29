import { Request, Response } from "express";

const Conversation = require('../Model/ConversationModel')
const User = require('../Model/UserModel')

// exports.startConversation = async (req: Request, res: Response) => {
//   // const { sender_id } = req.body
//   let newConversation = new Conversation({
//     users: [req.body.first_user, req.body.second_user]
//   })
//   await newConversation.save()
//   if (!newConversation) {
//     return res.status(400).json({ error: "somthing went wrong" })
//   }
//   return res.send(newConversation)
// }

exports.startChat = async (req: any, res: any) => {
  const { userId } = req.body
  var isChat = await Conversation.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } }
    ]
  })
    .populate("users", "-hashed_password -isVerified -role -salt")

  isChat = await User.populate(isChat, {
    path: 'latest_message.sender',
    select: "user_name profile_pic"
  })


  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    const createdChat = await Conversation.create(chatData);

    const FullChat = await Conversation.findOne({ _id: createdChat._id }).populate(
      "users", "-hashed_password -isVerified -role -salt",
    );
    res.status(200).json(FullChat);
  }
}

exports.getConversation = async (req: any, res: Response) => {
  let get_conversation = await Conversation.find({
    users: { $elemMatch: { $eq: req.user._id } }
  })
    .sort({ updatedAt: -1 })
    .populate("users", "-hashed_password -isVerified -role -salt",)
    .populate("latest_message")
  if (!get_conversation) {
    return res.status(400).json({ error: "somthing went wrong" })
  }
  return res.send(get_conversation)
}

exports.getConversationByUserId = async (req: any, res: Response) => {
  let conversation = await Conversation.findById(req.params.id).populate({
    path: 'users',
    select: '-hashed_password -isVerified -role -salt'
  })
  const user = conversation.users.find((u: any) => String(u._id) !== String(req.user._id))

  if (!conversation) {
    return res.status(400).json({ error: "something went wrong" })
  }
  return res.send(user)
}

exports.seenMessage = async (req: any, res: Response) => {
  let conversation = await Conversation.findById(req.params.id)
  if (!conversation) {
    return res.status(400).json({ error: 'Conversation not found' })
  }
  conversation.read_at = Date.now();
  await conversation.save();
  return res.status(200).json(conversation);
}