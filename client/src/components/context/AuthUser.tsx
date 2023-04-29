import React, { FunctionComponent, createContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';
import axios from 'axios';
import useSWR from 'swr'

import { IAuthProfile } from '../../@ypes/entities/IAuthProfile';
import { AppConfig } from '../../config/app.config';

interface IContext {
  authProfile?: IAuthProfile
  socket: Socket | null
}

interface Props {
  children: React.ReactNode
}

var newSocket: Socket

export const AuthContext = createContext<IContext>({
  authProfile: undefined,
  socket: null
});

const AuthUser: FunctionComponent<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const token = localStorage.getItem('access_token')

  const fetchUsers = async (url: string) => {
    const { data } = await axios.get<IAuthProfile>(`${AppConfig.api_url}/${url}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
    return data
  }

  const { data: authProfile } = useSWR('auth-user', fetchUsers, { revalidateOnFocus: false })

  useEffect(() => {
    if (authProfile) {
      newSocket = io('http://localhost:2000')

      newSocket.emit('setup', authProfile);
      newSocket.on('connection', message => {
        console.log(message)
      });
      setSocket(newSocket)

      // return () => {
      //   socket.disconnect();
      // }
    }

  }, [authProfile])

  useEffect(() => {
    if (socket && authProfile) {
      socket.emit('online', authProfile)
    }

  }, [authProfile, socket])

  return (
    <div>
      <AuthContext.Provider value={{ authProfile, socket }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthUser