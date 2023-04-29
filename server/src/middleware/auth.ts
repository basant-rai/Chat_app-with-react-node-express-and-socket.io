
// import { NextFunction, Request, Response } from "express";
// import NodeCache from "node-cache";

// const jwt = require("jsonwebtoken");
// const UserModel = require("../Model/UserModel");

// const cache = new NodeCache({ stdTTL: 60 * 60 }); // cache user data for 1 hour

// exports.verifyJWT = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.sendStatus(401);
//   const token = authHeader.split(" ")[1];
//   const decoded = jwt.verify(
//     token,
//     process.env.ACCESS_TOKEN_SECRET
//   ) as { id: string };

//   const cachedUser = cache.get(decoded.id);
//   if (cachedUser) {
//     req.user = cachedUser;
//     return next();
//   }

//   try {
//     const user = await UserModel.findById(decoded.id).select(
//       "-hashed_password"
//     );
//     if (!user) {
//       return res.sendStatus(404); // user not found
//     }

//     cache.set(decoded.id, user);
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500); // internal server error
//   }
// };


import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken")
const UserModel = require('../Model/UserModel')


exports.verifyJWT = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token is missing from authorization header");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findById(decoded.id).select("-hashed_password");
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};


// exports.verifyJWT = async (req: any, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.sendStatus(401);
//   // console.log(authHeader); // Bearer token
//   const token = authHeader.split(' ')[1];
//   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
  
//     // async (err: any, authData: any) => {
//     //   if (err) {
//     //     return res.sendStatus(403); //invalid token
//     //   } else {
//     //     const profile = await UserModel.findById(authData.id)
//     //     console.log(profile)
//     //     res.json({ message: "Welcome to profile", data: profile })
//     //   }

//     // }

//   );

//    req.user = await UserModel.findById(decoded.id).select("-hashed_password");
//   // res.json({ message: "Welcome to profile", data: user })

//   // console.log(user,'user')
//   next();


// }


