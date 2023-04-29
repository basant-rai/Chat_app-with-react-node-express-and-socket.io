import { Request, Response } from 'express'

const User_Chat_Model = require('../Model/UserModel')
const jwt = require('jsonwebtoken');

exports.getUsers = async (req: Request, res: Response) => {
  const get_all_users = await User_Chat_Model.find();
  if (!get_all_users) {
    return res.status(400).json({ error: "Somthing went wrong" });
  } else {
    return res.status(200).send(get_all_users)
  }
}


