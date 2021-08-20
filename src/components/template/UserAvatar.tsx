import Link from 'next/link'
import { useAuth } from '../../data/hook/useAuth'

interface UserAvatarProps {
  className?: string
}

function UserAvatar({ className }:UserAvatarProps) {
  const { user } = useAuth()
  return (
    <Link href="/profile">
      <img
       src={user?.imageUrl ?? 'https://avatars.githubusercontent.com/u/8572296?v=4'}
       alt={user?.name} 
       className={`h-10 w-10 rounded-full cursor-pointer ${className}`}/>
    </Link>

  )
}

export { UserAvatar }