// actions
import { getUserById } from '@/actions/user/get-user';
// components
import { EmptyState } from '@/components/system/EmptyState';

type Props = {
  params: {
    id: string;
  };
};


export default async function ChatPage({ params }: Props) {
  
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
        Chat
      </h1>
      
      {/* separator */}
      <div className='border-b '></div>
      
      {/* info */}
      <div className='p-4'>
        <p>{member.description}</p>
      </div>
      
    </div>
  );
}