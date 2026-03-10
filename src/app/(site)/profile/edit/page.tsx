// actions
import { getCurrentUser } from '@/actions/user/get-current-user';
// components
import { EmptyState } from '@/components/system/EmptyState';
import { ProfileForm } from './ui/ProfileForm';



export default async function EditProfilePage() {
  
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
        Edit Profile
      </h1>
      
      {/* info */}
      <div className='p-4'>
        <ProfileForm user={user} />
      </div>
      
    </div>
  );
}