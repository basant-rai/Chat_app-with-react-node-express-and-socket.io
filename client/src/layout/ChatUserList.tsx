import { FunctionComponent, useContext} from "react"
import { Link, useLocation } from "react-router-dom"

import { AuthContext } from "../components/context/AuthUser"

interface Props {
  users: IUser[]
}

interface IUser {
  users: IChatUser[],
  _id: string

}

interface IChatUser {
  _id: string
  email: string,
  profile_pic: string,
  user_name: string
}

// interface IAuthUser {
//   email: string,
//   user_name: string,
//   _id: string
// }

export const ChatUserList: FunctionComponent<Props> = ({ users }) => {

  const { pathname } = useLocation()

  // const [authUserData, setAuthUserData] = useState<IAuthUser>()
  // const dispatch = useAppDispatch();

  // const filter_users= users.map((u)=>u.users.filter((u)=>u._id!==authUserData?._id))

  // const token = localStorage.getItem('access_token')

  // useEffect(() => {
  //   const authUser = async () => {
  //     const auth_user = await dispatch(getAuthUser(token)).unwrap();
  //     // console.log(auth_user);

  //     if (auth_user.success) {
  //       setAuthUserData(auth_user?.data.auth_user)
  //     }
  //   }
  //   authUser()
  // }, [dispatch, token])

  const {authProfile}= useContext(AuthContext)

  return (
    <>
      {
        users.map((user, index) => (
          <div key={index}
            className={`${pathname === `/chat/${user._id}` ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-black'} rounded-lg `}>
            <Link to={`/chat/${user._id}`}>
              {
                user.users.map((u, index) => (
                  <div key={index}>
                    {
                      u._id !== authProfile?._id &&
                      <div className="relative w-full flex items-center justify-between px-4 py-2 ">
                        <div className='inline-flex items-center space-x-3 flex-shrink-0'>
                          <div className="flex-shrink-0">
                            <div className='rounded-full w-full'>
                              <img
                                className='ring-1 ring-white h-10 w-10 rounded-full object-cover'
                                src={u.profile_pic} alt='aaa' />
                            </div>
                          </div>
                          <div className=''>
                            <p className="text-lg font-medium truncate text-start">{u.user_name}</p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                ))
              }

              {/* <div>
              {
                user.user_id &&
                <UserOnlineStatus user={user.user_id} />
              }
            </div> */}
              {/* </div> */}
            </Link >
          </ div >

        ))
      }
      < div
        className='bg-indigo-700 rounded-lg'>
        <Link to={`#`}>
          <button className="relative w-full flex items-center justify-between px-4 py-2 ">
            <div className='inline-flex items-center space-x-3 flex-shrink-0'>
              <div className="flex-shrink-0">
                <div className="">
                  <div className='rounded-full shrink-0'>
                    <img
                      className='ring-1 ring-white h-10 w-10 rounded-full shrink-0'
                      src='https://wallpapers.com/images/featured/87h46gcobjl5e4xu.jpg' alt='aaa' />
                  </div>
                </div>
              </div>
              <div className=''>
                <p className="text-lg font-medium truncate text-start text-white ">Basanat</p>
              </div>
            </div>
            {/* <div>
            {
              user.user_id &&
              <UserOnlineStatus user={user.user_id} />
            }
          </div> */}
          </button>
        </Link>
      </ div >

    </>

  )
}
