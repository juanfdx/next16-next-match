import { getUserById } from '@/actions/user/get-user';
import { EmptyState } from '@/components/system/EmptyState';
import { notFound } from 'next/navigation';


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
    <div>page</div>
  )
}