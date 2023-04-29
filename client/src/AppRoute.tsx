import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './page/Login'
import { Register } from './page/Register'
import { Chat } from './page/chat/Chat'
import { Message } from './page/chat/Message'
import { Authlayout } from './layout/Authlayout'

export const AppRoute = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<Authlayout />}>
            <Route path='/chat' element={<Chat />} />
            <Route path='/chat/:id' element={<Message />} />
          </Route>

        </Routes>
      </Router>
    </div>
  )
}
