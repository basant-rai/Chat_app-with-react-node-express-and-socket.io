import React, { FunctionComponent } from 'react'
import { IChatUser } from '../../@ypes/entities/IChatUser'
import { useNavigate } from "react-router-dom";

interface Props {
  user: IChatUser
}

export const UserProfile: FunctionComponent<Props> = ({ user }) => {
  var navigate = useNavigate();
  
  return (
    <div className='flex items-center'>
      <button onClick={() => navigate('/chat')}>
        <svg xmlns="http://www.w3.org/2000/svg"
          className='w-5 h-5'
          viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" /></svg>
      </button>
      <div className='flex items-center space-x-2 px-4 mt-2 py-2 sticky top-0'>
        <div className='rounded-full overflow-hidden'>
          <img
            className='h-14 w-14 rounded-full'
            src={user.profile_pic} alt={user.user_name} />
        </div>
        <p className='text-xl font-bold'>{user.user_name}</p>
      </div>
    </div>
  )
}
