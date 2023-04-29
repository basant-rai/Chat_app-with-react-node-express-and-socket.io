import React, { FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  id: string,
  content?: string
}

const LatestMessage: FunctionComponent<Props> = ({ id, content }) => {
  const { pathname } = useLocation()

  return (
    <div>
      <span
        className={`${pathname === `/chat/${id}` ? 'text-white' : 'text-black'} text-sm ml-1`}>
        {content}
      </span>
    </div>
  )
}

export default LatestMessage