// actions
import { getUserById } from '@/actions/user/get-user-by-id';
// components
import { EmptyState } from '@/components/system/EmptyState';
import { ProfileCard } from '@/components/members/ProfileCard';

type Props = {
  params: {
    id: string;
  };
};


export default async function MemberProfilePage({ params }: Props) {

  const { id } = await params;
  const response = await getUserById(id);

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

  const member = response.data;


  return (
    <div>
      <h1 className='text-xl font-semibold text-center text-white uppercase py-2 bg-linear-to-r from-purple-500 to-pink-500'>
        Profile
      </h1>
      
      {/* info */}
      <ProfileCard user={member} />
      
    </div>
  );
}