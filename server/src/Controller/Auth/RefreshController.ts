// import { Request, Response } from "express";
// const jwt = require('jsonwebtoken')
// const UserModel = require('../../Model/UserModel')


// const handleRefreshToken = (req: Request, res: Response) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(401);
//   const refreshToken = cookies.jwt;

//   // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
//   const authUser = UserModel.find()
//   if (!foundUser) return res.sendStatus(403); //Forbidden 
//   // evaluate jwt 
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     (err: any, decoded: any) => {
//       if (err) return res.sendStatus(403);
//       const accessToken = jwt.sign(
//         { "email": decoded.email },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '30s' }
//       );
//       res.json({ accessToken })
//     }
//   );
// }

// module.exports = { handleRefreshToken }