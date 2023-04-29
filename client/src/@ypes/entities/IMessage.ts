export interface IMessage {
  content: string,
  conversation_id: string,
  sender: {
    _id: string,
    user_name: string,
    profile_pic: string
  }
  _id: string,
  updatedAt: string,
  createdAt: string

}

