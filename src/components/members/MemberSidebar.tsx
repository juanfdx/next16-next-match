import Image from 'next/image'
// components
import { MenuLinks } from '../navbar/MenuLinks'
import { LinkButton } from '../ui/LinkButton'
// utils
import { calculateAge } from '@/utils/helpers'
import { Member } from '@/utils/types'
import { NavLink } from '@/utils/links'

type Props = {
  member: Member
  profileLinks: NavLink[]
}


export const MemberSidebar = ({ member, profileLinks }: Props) => {

  return (
    <aside className="md:col-span-1 p-5 bg-white shadow-md border border-gray-100 rounded-xl">
      {/* avatar */}
      <div className="w-50 h-50 mx-auto overflow-hidden rounded-full border-2 border-gray-200 mt-1">
        <Image 
          src={member.image || '/images/user.png'} 
          alt={member.name || 'member avatar'} 
          width={100} 
          height={100} 
          className='w-full h-full object-cover ' 
          priority
        />
      </div>
      {/* member short info */}
      <div className="text-center mt-4">
        <p className="text-xl text-black font-semibold">{member.name || 'No name'}, {calculateAge(member.dateOfBirth)}</p>
        <p className="text-sm text-gray-600">{member.city || 'No city'}, {member.country || 'No country'}</p>
      </div>

      {/* separator */}
      <div className='border-b border-gray-200 my-5'></div>

      {/* profile links */}
      <div className='flex flex-col'>
        <MenuLinks isAdminUser={false} links={profileLinks} size='lg'  />
      </div>

      {/* go back */}
      <div className='mt-14'>
        <LinkButton href='/members' label='Go Back' variant='solid' />
      </div> 
    </aside>
  )
}