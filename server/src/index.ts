import { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";


const express = require('express');
require('dotenv').config();


const database_connect = require('./Database/connection')

const app = express();
const port = process.env.PORT;
var bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const morgan = require('morgan');
const cors = require('cors')


const AuthRoute = require('./Route/AuthRoute')
const UserRoute = require('./Route/UserRoute')
const MessageRoute = require('./Route/MessageRoute')
const ConversationRoute = require('./Route/ConversationRoute')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(cookieparser());
app.use(morgan('dev'))
app.use(cors());
// app.use((req:Request, res:Response, next:NextFunction) => {
//   res.setHeader('Access-control-Allow', '*');
//   res.setHeader('Access-control-Allow',
//       'GET,POST,PUT,DELETE');
//   res.setHeader(
//       'Access-control-Allow-Headers',
//       'Content-Type,Authorization'
//   )
//   next();
// })


// const Auth = require('./middleware/auth')
app.use('/api/v1', AuthRoute);

// app.use(Auth);
app.use('/api/v1', UserRoute);
app.use('/api/v1', MessageRoute);
app.use('/api/v1', ConversationRoute);

app.listen(port, () => {
  console.log(`Server get started at port ${port}`);
})

// const io = require('socket.io')( {
//   pingTimeout: 60000,
//   cors: {
//     origin: 'http://localhost:3000'
//   }
// })

const io = new Server(2000, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
})

let activeUsers: any[] = []

io.on("connection", (socket) => {
  console.log('socket io start')

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('Connected')
  })

  socket.on('chat-room', (room) => {
    socket.join(room);
    console.log("User joined room", room)
  })

  socket.on('offline', (userData) => {
    const index = activeUsers.findIndex((u) => u._id === userData._id);
    if (index !== -1) {
      activeUsers.splice(index, 1);
    }
  })

  socket.on('online', (userData) => {
    if (!activeUsers.some((user) => user._id === userData._id)) {
      activeUsers.push(userData)
    }
    io.emit('online-status', activeUsers)

    console.log(activeUsers)
  })



  socket.on('new-message', (message, room) => {
    console.log(message, room)
    socket.join(room);

    // io.emit('receive-message', messaDSge)
    io.to(room).emit('receive-message', message)
    // socket.to(room).emit('receive-messag', message)
    io.in(message.sender).emit('Message received ')
  })


  socket.on('delete', (message, room) => {
    console.log(message, room)
    socket.join(room);

    // io.emit('receive-message', messaDSge)
    io.to(room).emit('delete-message', message)
    // socket.to(room).emit('receive-messag', message)
    io.in(message.sender).emit('Message received ')
  })

  // socket.off("setup", (userData) => {
  //   socket.leave(userData)
  // })
})

    // "start": "npx tsc && nodemon dist/index.js"



