import { generateProfileLinks } from '@/utils/helpers';
// actions
import { getUserById } from '@/actions/user/get-user';
// components
import { EmptyState } from '@/components/system/EmptyState';
import { MemberSidebar } from '@/components/members/MemberSidebar';


export default async function MemberLayout({
 children,
 params
}: {
 children: React.ReactNode;
 params: { id: string };
}) {

  const { id } = await params;
  const response = await getUserById(id);

  if (!response.success) {
    return (
      <EmptyState
        title="Request Failed"
        description={response.error ?? "Unable to load member"}
        actionLabel="Back to Members"
        actionHref="/members"
      />
    );
  }

  const member = response.data;
  const profileLinks = generateProfileLinks(id);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5">
  
      <MemberSidebar member={member} profileLinks={profileLinks} />

      <main className="md:col-span-2 bg-white shadow-md rounded-xl overflow-hidden">
        {children}
      </main>

    </div>
  )
}