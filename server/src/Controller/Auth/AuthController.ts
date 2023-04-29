import { Request, Response } from 'express'

const User_Chat_Model = require('../../Model/UserModel')
const jwt = require('jsonwebtoken');


exports.verifyJWT = (req: Request, res: Response,) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  // console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: any, authData: any) => {
      console.log(err)
      console.log(authData)
      if (err) {
        return res.sendStatus(403); //invalid token
      } else {
        const profile = await User_Chat_Model.findOne({ email: authData.email }).select("-hashed_password").select("-isVerified").select("-salt")
        res.json({ message: "Welcome to profile", data: profile })
      }
      // req.user = decoded.username;
      // next();

    }

  );
}

exports.authUser = async (req: any, res: any) => {
  try {
    const user = await User_Chat_Model.findById({ _id: req.user._id }).select("-hashed_password").select("-isVerified").select("-salt").select("-role")
    // console.log(user)
    
    const timestamp = new Date();
    user.last_online = timestamp
    await user.save()
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500)
  }
}

exports.addUser = async (req: Request, res: Response) => {
  const unique_email = await User_Chat_Model.findOne({ email: req.body.email });
  if (!unique_email) {
    let user = new User_Chat_Model({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
      country: req.body.country,
      address: req.body.address
    })
    user = await user.save();

    if (!user) {
      return res.status(400).json({ error: "User cannot be saved" })
    } else {
      return res.status(200).json({ message: 'User created successfully' })
    }
  } else {
    return res.status(400).json({ error: "Email already exist" })
  }
}

exports.signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User_Chat_Model.findOne({ email: email })

  if (!user) {
    return res.status(400).json({ error: "Email not register" })
  }
  if (!user.authenticate(password)) {
    return res.status(400).json({ error: "Password incorrect" })
  }
  const timestamp = new Date();

  user.last_online = timestamp
  await user.save()

  const access_token = jwt.sign(
    {
      "id": user._id,
      "email": user.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  const refreshToken = jwt.sign(
    {
      "id": user._id,
      "email": user.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('jwt', access_token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
  res.json({
    message: 'User login ',
    access_token
  });
}