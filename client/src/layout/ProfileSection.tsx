
import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/context/AuthUser"

export const ProfileSection = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { authProfile, socket } = useContext(AuthContext)


  const handleLogout = useCallback(() => {
    socket && socket.emit('offline', authProfile)
    localStorage.removeItem('access_token')
    navigate('/')
  }, [authProfile, navigate, socket])

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-full">
        <div className='flex items-center space-x-2 px-4 mt-2 border-b py-2'>
          <div className='rounded-full overflow-hidden'>
            <img
              className='h-10 w-10 rounded-full object-cover'
              src={authProfile?.profile_pic} alt='profile' />
          </div>
          <p className='text-xl font-bold'>{authProfile?.user_name}</p>
        </div>
      </button>
      {
        open &&
        <div className="absolute bg-white w-1/2 py-2 mx-auto rounded-xl shadow-2xl z-10 border-2 -mt-2">
          <ol className="px-2 divide-y">
            <li className="hover:bg-indigo-700 hover:text-white hover:cursor-pointer p-1 rounded">
              Profile
            </li>
            <li className="hover:bg-indigo-700 hover:text-white hover:cursor-pointer p-1 rounded" onClick={handleLogout}>
              Logout
            </li>
          </ol>
        </div>
      }
    </div>
  )
}
