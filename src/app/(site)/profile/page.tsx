// actions
import { getCurrentUser } from '@/actions/user/get-current-user';
import { ProfileCard } from '@/components/members/ProfileCard';
// components
import { EmptyState } from '@/components/system/EmptyState';
import { calculateAge } from '@/utils/helpers';
import Image from 'next/image';



export default async function ProfilePage() {

  const response = await getCurrentUser();
  
  if (!response.success) {
    return (
      <EmptyState
        title="Request Failed"
        description={response.error ?? "Unable to load profile"}
        actionLabel="Back to Members"
        actionHref="/members"
      />
    );
  }
  
  const user = response.data;


  return (
    <div>
      <h1 className='text-xl font-semibold text-center text-white uppercase py-2 bg-linear-to-r from-purple-500 to-pink-500'>
        Profile
      </h1>
      
      {/* info */}
      <ProfileCard user={user} />
    </div>
  );
}