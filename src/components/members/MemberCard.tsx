import Image from 'next/image'
import Link from 'next/link'
// utils
import type { Profile } from '@/utils/types'
import { calculateAge } from '@/utils/helpers'
import { LikeButton } from '../ui/LikeButton'

type Props = {
  member: Profile
  likeIds: string[]
}


export const MemberCard = ({ member, likeIds }: Props) => {

  const isLiked = likeIds.includes(member.id);

  
  return (
    <Link href={`/members/${member.id}/profile`} className='relative flex flex-col border rounded-xl overflow-hidden'>
      {/* avatar */}
      <div className='overflow-hidden'>
        <Image 
          src={member.image || '/images/user.png'} 
          alt={member.name || 'member avatar'} 
          width={100} 
          height={100} 
          className='w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105' 
          priority
        />
      </div>

      {/* like button */}
      <LikeButton targetId={member.id} isLiked={isLiked} />

      {/* info */}
      <div className='w-full px-2 py-1 rounded-b-xl bg-linear-to-r from-purple-500 to-pink-500'>
        <h2 className='leading-5 font-medium text-white'>
          {member.name || 'No name'}, {calculateAge(member.dateOfBirth)}
        </h2>
        <p className='leading-5 text-white text-sm'>{member.city || 'No city'}</p>
      </div>
    </Link>
  )
}