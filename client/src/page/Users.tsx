import axios from 'axios'
import { AppConfig } from '../config/app.config'
import useSWR from 'swr'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


interface IUser {
  user_name: string,
  email: string,
  _id: string,
  profile_pic: string
}

interface Props {
  setOpen: Function
}

interface IConversation {
  _id: string
}


const Users: FunctionComponent<Props> = ({ setOpen }) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<IUser[]>([])
  const navigate = useNavigate()


  const token = localStorage.getItem('access_token')

  const fetchUsers = async (url: string) => {
    const { data } = await axios.get<IUser[]>(`${AppConfig.api_url}/${url}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
    return data
  }

  const { data: users } = useSWR('users', fetchUsers, { revalidateOnFocus: false })

  useEffect(() => {
    if (users) {
      setFilter(users.filter((u) => u.user_name.toLowerCase().match(search.toLowerCase())))
    }

  }, [search, users])

  const handleMessage = useCallback(async (userId: string) => {
    try {

      const startConversation = await axios.post<IConversation>(`${AppConfig.api_url}/new-conversation`,
        { userId }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      navigate(`/chat/${startConversation.data._id}`)
    } catch (error: any) {
      throw error
    }

  }, [navigate, token])

  return (
    <div className='flex items-center justify-center min-h-screen mx-auto bg-green-'>
      <div className='px-5 py-2 w-full sm:w-1/2 xl:w-1/4 bg-white border rounded-xl'>
        <div className='flex items-center justify-between'>
          <h3 className='font-bold text-xl py-2'>New Message</h3>
          <div>
            <button onClick={() => setOpen(false)}>
              <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            </button>
          </div>

        </div>
        <div>
          <input
            type="text"
            onChange={e => setSearch(e.target.value)}
            className="block w-full px-4 py-3 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search users..." />

        </div>
        <div>
          <p className='text-gray-500 py-1'>Choose user to start conversation</p>
          <div className='h-64 '>
            <div className='h-full overflow-y-auto'>
              {
                filter.length > 0 ?
                  <>
                    {
                      filter?.map((user, index) => (
                        <div key={index}
                          className={`bg-gray-50 hover:bg-gray-200 text-black rounded-lg my-2 hover:cursor-pointer`}
                          onClick={() => handleMessage(user._id)}
                        >
                          <div className="relative w-full flex items-center justify-between px-4 py-2 ">
                            <div className='inline-flex items-center space-x-3 flex-shrink-0'>
                              <div className="flex-shrink-0">
                                <div className='rounded-full w-full'>
                                  <img
                                    className='ring-1 ring-white h-10 w-10 rounded-full object-cover'
                                    src={user.profile_pic} alt='aaa' />
                                </div>
                              </div>
                              <div className=''>
                                <p className="text-lg font-medium truncate text-start">{user.user_name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </> :
                  <p className='h-full flex items-center justify-center'>
                    No users found
                  </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users