import Image from 'next/image';
// utils
import { profileLinks } from '@/utils/links';
import { calculateAge } from '@/utils/helpers';
// actions
import { getUserById } from '@/actions/user/get-user';
// components
import { MenuLinks } from '@/components/navbar/MenuLinks';
import { EmptyState } from '@/components/system/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';


type Props = {
  params: {
    id: string;
  };
}


export default async function MemberDetailedPage({ params }: Props) {

  const { id } = await params;
  const response = await getUserById(id);

  if (!response.success) {
    return (
      <EmptyState
        title="Can't perform this action."
        description={response.error ?? "Unable to load members"}
        actionLabel="Back to Members"
        actionHref="/members"
      />
    );
  }

  const member = response.data;



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
  
      <aside className="md:col-span-1 p-5 bg-white shadow-md border border-gray-100 rounded-xl">
       {/* avatar */}
       <div className="w-50 h-50 mx-auto overflow-hidden rounded-full mt-1">
          <Image 
            src={member.image || '/images/user.png'} 
            alt={member.name || 'member avatar'} 
            width={100} 
            height={100} 
            className='w-full h-full object-cover' 
            priority
          />
       </div>
        {/* member info */}
        <div className="text-center mt-4">
          <p className="text-xl font-semibold">{member.name || 'No name'}, {calculateAge(member.dateOfBirth)}</p>
          <p className="text-sm text-gray-600">{member.city || 'No city'}, {member.country || 'No country'}</p>
        </div>

        {/* separator */}
        <div className='border-b my-5'></div>
        <div className='flex flex-col'>
          <MenuLinks isAdminUser={false} links={profileLinks} size='lg'  />
        </div>

        {/* go back */}
        <div className='mt-4'>
          <LinkButton href='/members' label='Go Back' variant='solid' />
        </div> 
      </aside>


      <main className="md:col-span-2 p-5 bg-white shadow-md border border-gray-100 rounded-xl">
        Main content
      </main>

    </div>
  )
}