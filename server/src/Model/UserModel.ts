const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const uuidv1 = require('uuidv1');

const user_table = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    trim: true
  },
  user_image: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  profile_pic:{
    type:String,
    default:'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/165844201/original/c0aee438ce5e30b854ad37a9d90157f53cf3bb52/create-the-profile-cartoon-pictures.png'
  },
  hashed_password: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  isVerified: {
    type: Boolean,
    default: false

  },
  role: {
    type: Number,
    default: 0
  },
  last_online:{
    type:Date,

  },
  salt: String

}, { timestamps: true })

// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(req.body.password, salt);

user_table.virtual('password')
  .set(function (password: string) {
    if (password) {
      this._password = password;
      this.salt = uuidv1()
      this.hashed_password = this.encryptedPassword(this._password)
    }
  })
  .get(function (): string | undefined {
    if (this._password) {
      return this._password
    }

  })

user_table.methods = {
  encryptedPassword: function (password: string) {
    if (password == null) {
      return ''
    }
    try {
      return (this.hashed_password = crypto.createHmac('sha256', this.salt).update(password).digest('hex'))
    }
    catch {
      return ''
    }
  },
  authenticate: function (password: string) {
    return this.hashed_password === this.encryptedPassword(password)
  }
}


module.exports = mongoose.model("UserModel", user_table);
