import { getLikedUsers } from '@/actions/like/get-liked-users';
import { getCurrentUserLikeIds } from '@/actions/like/get-user-likes';
import { MatchesTabs } from '@/components/list/MatchesTabs';
import { MemberCard } from '@/components/members/MemberCard';
import { EmptyState } from '@/components/system/EmptyState';

type Props = {
  searchParams: { 
    type?: string
  };
}


export default async function ListsPage({ searchParams }: Props) {

  const params = await searchParams;
  const type = params?.type ?? 'source';

  const likeIdsResult = await getCurrentUserLikeIds();
  const membersResult = await getLikedUsers(type);

  if (!likeIdsResult.success || !membersResult.success) {
    return (
      <EmptyState 
        title="Request Failed"
        description="Something went wrong while loading members." 
      />
    );
  }

  const likeIds = likeIdsResult.data;
  const members = membersResult.data;

 

  return (
    <div>
      <MatchesTabs />

      {/* members */}
      {members.length === 0 ? (
        <EmptyState 
          description="There is no members to display at the moment." 
        />

      ) : (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {members?.map((member) => (
            <MemberCard key={member.id} member={member} likeIds={likeIds} />
          ))}
        </div>
      )}

    </div>
  );
}