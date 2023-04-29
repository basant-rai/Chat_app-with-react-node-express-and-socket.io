import { FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useSWR, { mutate } from 'swr'
import axios from "axios"

import { IChatUser } from "../../@ypes/entities/IChatUser"
import { AppConfig } from "../../config/app.config"
import { IMessage } from "../../@ypes/entities/IMessage"

import { AuthContext } from "../../components/context/AuthUser"
import { SendMessage } from "../../components/@form/SendMessage"
import { formatDate } from "../../utils/TimeFormat"


interface Props {
  user: IChatUser
}

export const Messages: FunctionComponent<Props> = ({ user }) => {

  const [messageId, setMessageId] = useState('')
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const [chatId, setChatId] = useState('')


  const { id } = useParams()
  const messageref = useRef<any>(null)
  const { authProfile, socket } = useContext(AuthContext)
  const token = localStorage.getItem('access_token')

  const fetchMessages = useCallback(async (url: string) => {
    try {
      const { data } = await axios.get<IMessage[]>(`${AppConfig.api_url}/${url}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      socket && socket.emit('chat-room', id)
      return data
    } catch (error: any) {
      throw error
    }
  }, [id, socket, token])

  const { data: messages } = useSWR(
    `messages/${id}`,
    fetchMessages,
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    socket && socket.on('receive-message', (message) => {
      if (messages) {
        const updateMesssage = [
          ...messages, message
        ]
        console.log(updateMesssage)
        mutate(`messages/${id}`, updateMesssage, false)
      }
    })
  }, [id, messages, socket])

  useEffect(() => {
    socket && socket.on('delete-message', (message) => {
      if (messages) {
        const updateMesssage = {
          ...messages, message
        }
        console.log(updateMesssage)
        mutate(`messages/${id}`, updateMesssage, false)
      }
    })
  }, [id, messages, socket])

  useEffect(() => {
    messageref.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleShowDate = useCallback((id: string) => {
    setMessageId(id)
    setShow(!show)
  }, [show])

  const handleOpen = useCallback((id: string) => {
    setOpen(!open)
    setChatId(id)

  }, [open])

  const deleteMessage = useCallback(async (_id: string) => {
    try {
      await axios.delete(`${AppConfig.api_url}/message/${_id}`,
        {
          headers: { "Authorization": `Bearer ${token}` }

        })

      if (messages) {
        const updateMessage = [
          ...messages?.filter((m) => m._id !== _id)
        ]
        mutate(`messages/${id}`, updateMessage, false)
      }

    }
    catch (error: any) {
      throw error;
    }

  }, [id, messages, token])

  return (
    <div>
      <div className="h-[calc(100vh-150px)] overflow-auto">
        <div className='flex justify-center px-4 mt-2 py-2 '>
          <div>
            <div className='rounded-full overflow-hidden'>
              <img
                className='h-28 w-28 rounded-full object-cover'
                src={user.profile_pic}
                alt={user.user_name}
              />
            </div>
            <p className='text-xl font-bold text-center'>{user.user_name}</p>
          </div>
        </div>
        <div className="mt-10">
          {
            messages?.map((message, index) => (
              <div className="grid grid-cols-12 gap-y-2 auto-cols-max" key={index} ref={messageref}>
                {
                  message.sender._id === authProfile?._id ?
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse ">
                        <div className="group flex space-x-2 items-center">
                          {
                            message._id === messageId &&
                            <span className={`text-[10px]`}>{formatDate(message.updatedAt)}</span>
                          }
                          <div>

                            {/* <button
                              className="hidden group-hover:block"
                              onClick={() => setOpen(true)}>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                            </button> */}
                            {
                              open &&
                              message._id === chatId &&
                              <div className="bg-white">
                                <ol className="text-sm">
                                  {/* <li>Edit</li> */}
                                  <li>
                                    <button onClick={() => deleteMessage(message._id)}>Delete</button>
                                  </li>
                                </ol>
                              </div>
                            }

                          </div>
                          <div>
                            <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow  rounded-l-lg rounded-b-lg hover:cursor-pointer"
                              onMouseEnter={() => handleShowDate(message._id)}
                              onMouseLeave={() => setMessageId('')}
                              onClick={() => handleOpen(message._id)}
                            >
                              <div className='text-white'>{message.content}</div>
                            </div>

                          </div>
                        </div>

                      </div>

                    </div> :
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className=' rounded-full shrink-0'>
                          <img
                            className='h-10 w-10 rounded-full shrink-0 object-cover '
                            src={message.sender.profile_pic}
                            alt={message.sender.user_name}
                          />
                        </div>
                        <div className="group flex space-x-2 items-center">


                          <div>
                            <div className="relative ml-3 text-sm bg-gray-100 py-2 px-4 shadow rounded-r-lg rounded-b-lg hover:cursor-pointer"
                              onMouseEnter={() => handleShowDate(message._id)}
                              onMouseLeave={() => setMessageId('')}
                              onClick={() => handleOpen(message._id)}

                            >
                              <div className='text-black'>{message.content}</div>
                            </div>
                          </div>

                          {
                            open &&
                            message._id === chatId &&
                            <div className="bg-white">
                              <ol className="text-sm">
                                {/* <li>Edit</li> */}
                                <li>
                                  <button onClick={() => deleteMessage(message._id)}>Delete</button>
                                </li>
                              </ol>
                            </div>
                          }
                          {
                            message._id === messageId &&
                            <span className={`text-[10px]`}>{formatDate(message.updatedAt)}</span>
                          }
                        </div>

                      </div>
                    </div>
                }
              </div>
            ))
          }
        </div>
      </div>
      {
        <SendMessage socket={socket} />
      }
    </div>
  )
}
