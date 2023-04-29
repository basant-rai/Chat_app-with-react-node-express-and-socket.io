import { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthUser";

// import { IAuthProfile } from "../../@ypes/entities/IAuthProfile";
// import { mutate } from "swr";

interface Props {
  last_online: string
  user: IChatUser
}

interface IChatUser {
  _id: string
  email: string,
  profile_pic: string,
  user_name: string
  last_online: string
}

const Online: FunctionComponent<Props> = ({ last_online, user }) => {
  // const [lastOnlineTime, setLastOnlineTime] = useState<string>()

  // console.log(user)

  const [isOnline, setIsOnline] = useState(false);
  // const [isActive, setIsActive] = useState(false)

  const { socket } = useContext(AuthContext)

  useEffect(() => {

    socket && socket.on('online-status', (userData: IChatUser[]) => {
      if (userData.some((u) => u._id === user._id)) {
        setIsOnline(true)
      }
    })

  }, [socket, user])

  // useEffect(() => {
  //   const checkStatus = () => {
  //     const currentTime = Date.now();

  //     const lastOnline = lastOnlineTime && new Date(Date.parse(lastOnlineTime)).getTime();
  //     const timeDiff = lastOnline && currentTime - lastOnline;


  //     if (timeDiff) {
  //       const isUserOnline = timeDiff < 300000;
  //       // User is online if last online time is within 5 minutes
  //       setIsOnline(isUserOnline);

  //       // check th user is active or not between 5 to 10 min
  //       const checkIsActive = timeDiff > 300000 && timeDiff < 600000;
  //       setIsActive(checkIsActive)
  //     }
  //   };

  //   checkStatus(); // Call the function on mount

  //   const intervalId = setInterval(() => {
  //     checkStatus(); // Check the status every 1 minute
  //   }, 60000);

  //   return () => clearInterval(intervalId); // Clear the interval on unmount
  // }, [lastOnlineTime]);


  return (
    <div className={`
    ${isOnline === true && 'bg-green-500 border '} 
    p-1.5 rounded-full shadow-xl `}
    >
      {/* ${isActive === true && 'bg-gray-400 border '} */}

    </div>
  )
}

export default Online