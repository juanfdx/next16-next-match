// actions
import { getCurrentUserLikeIds } from '@/actions/like/get-user-likes';
import { getUsers } from '@/actions/user/get-users';
// components
import { MemberCard } from '@/components/members/MemberCard';
import { EmptyState } from '@/components/system/EmptyState';




export default async function MembersPage() {

  const response = await getUsers();
  const responseLikes = await getCurrentUserLikeIds();


  if (!response.success) {
    return (
      <EmptyState
        title="Request Failed"
        description={response.error ?? "Unable to load members"}
        actionLabel="Back home"
      />
    );
  }

  const members = response.data;

  if (members.length === 0) {
    return (
      <EmptyState 
        description="There is no members to display at the moment." 
        actionLabel="back home" 
      />
    )
  }
  const likeIds = responseLikes.success ? responseLikes.data : [];

  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} likeIds={likeIds} />
      ))}
    </div>
  );
}