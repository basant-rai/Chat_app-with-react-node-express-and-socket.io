
import { ChatSection } from '../../components/@chat/ChatSection'
import { UserList } from '../../components/@user-list/UserList'
import { ProfileSection } from '../../layout/ProfileSection'

export const Message = () => {

  return (
    <div className="w-full md:flex ">
      <div className="hidden md:block shrink-0 px-2  border-r min-w-0 md:w-[398px] max-w-full">
        <ProfileSection />
        <div className='mt-4'>
          <UserList />
        </div>
      </div>
      <div className="grow px-4">
        <ChatSection />
      </div>
    </div>
  )
}

