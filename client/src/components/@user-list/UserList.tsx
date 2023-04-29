import { FunctionComponent, useCallback, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useSWR, { mutate } from 'swr'
import axios from 'axios'

import { AuthContext } from '../context/AuthUser'

import { IMessage } from '../../@ypes/entities/IMessage'
import { AppConfig } from '../../config/app.config'
import LatestMessage from '../@chat/LatestMessage'
import Online from '../@chat/Online'

interface IUser {
  users: IChatUser[],
  _id: string
  latest_message: {
    content: string
  }
  updatedAt: string
}

interface IChatUser {
  _id: string
  email: string,
  profile_pic: string,
  user_name: string
  last_online: string
}


export const UserList: FunctionComponent = () => {

  const { pathname } = useLocation()
  const token = localStorage.getItem('access_token')
  const { authProfile, socket } = useContext(AuthContext)

  const fetchUsers = async (url: string) => {
    try {
      const { data } = await axios.get<IUser[]>(`${AppConfig.api_url}/${url}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )
      return data
    } catch (error: any) {
      throw error
    }
  }

  const { data: users } = useSWR('conversations', fetchUsers, { revalidateOnFocus: false })


  useEffect(() => {
    socket && socket.on('receive-message', (message: IMessage) => {
      // const fil

      if (users && message) {
        const filterUser: IUser | undefined = users.find((user) => user._id === message.conversation_id)

        const updateUser = {
          ...filterUser,
          updatedAt: message.updatedAt,
          latest_message: {
            ...filterUser?.latest_message, content: message.content
          }
        }

        const updateUsers = [
          ...users.map((user) => user._id === updateUser._id ? updateUser : user)
        ] as IUser[]

        const sortUser = updateUsers.sort((a, b) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        })

        mutate(`conversations`, sortUser, false)
      }
    })

  }, [socket, users])

  const messageSeen = useCallback(async (conversation_id: string) => {
    try {

      const message = await axios.post(`${AppConfig.api_url}/seen-message/${conversation_id}`)

      console.log(message)
    } catch (error) {
      throw error
    }

  }, [])

  return (
    <>
      {
        users &&
          users?.length > 0 ?
          <>
            {
              users.map((user, index) => (
                <div key={index}
                  className={`${pathname === `/chat/${user._id}` ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-black'} my-2 rounded-lg `}>
                  <Link to={`/chat/${user._id}`} onClick={() => messageSeen(user._id)}>
                    {
                      user.users.map((u, index) => (
                        <div key={index}>
                          {
                            u._id !== authProfile?._id &&
                            <div className="relative w-full flex items-center justify-between px-4 py-2 ">
                              <div className='inline-flex items-center space-x-3 flex-shrink-0'>
                                <div className="flex-shrink-0">
                                  <div className='rounded-full w-full relative bg-black/80'>
                                    <img
                                      className='ring-1 ring-white h-10 w-10 rounded-full object-cover bg-black/80'
                                      src={u.profile_pic}
                                      alt='aaa'
                                    />
                                    <div className='absolute right-0 -bottom-0.5'>
                                      <Online
                                        last_online={u.last_online}
                                        user={u}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className=''>
                                  <p className="text-lg font-medium truncate text-start">{u.user_name}</p>
                                  <LatestMessage
                                    id={user._id}
                                    content={user.latest_message?.content}
                                  />
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      ))
                    }
                  </Link>
                </div>
              ))
            }
          </> :
          <>
            <p className='text-center'>No conversation</p>
          </>
      }
    </>
  )
}
