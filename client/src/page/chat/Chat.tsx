import { useState } from 'react'
import { UserList } from '../../components/@user-list/UserList'
import { ProfileSection } from '../../layout/ProfileSection'
import Users from '../Users'


export const Chat = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="w-full md:flex ">
        <div className="shrink-0 px-2  border-r min-w-0 md:w-[398px] max-w-full">
          <ProfileSection />
          <div className='mt-4'>
            <UserList />
          </div>
        </div>
        <div className="hidden grow md:flex 5 w-full min-h-screen  justify-center items-center">
          <div className='space-y-4'>
            <h5 className='text-2xl font-bold'>Select chat to start conversation</h5>
            <div className='text-center'>
              <button onClick={() => setOpen(true)} className='bg-indigo-700 text-white text-sm font-bold px-4 py-2.5 rounded-full'>New conversation</button>
            </div>
          </div>
        </div>
      </div>
      {
        open &&
        <div className='absolute z-20 top-0 right-0 left-0 bottom-0 bg-black/60'>
          <Users setOpen={setOpen} />
        </div>
      }
    </>
  )
}
