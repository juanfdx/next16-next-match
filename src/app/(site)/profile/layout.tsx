// utils
import { profileLinks } from '@/utils/links';
// actions
import { getCurrentUser } from '@/actions/user/get-current-user';
// components
import { MemberSidebar } from '@/components/members/MemberSidebar';
import { EmptyState } from '@/components/system/EmptyState';




export default async function ProfileLayout({
 children
}: {
 children: React.ReactNode;
}) {

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5">
  
      <MemberSidebar member={user} profileLinks={profileLinks} />

      <main className="md:col-span-2 bg-white shadow-md rounded-xl overflow-hidden">
        {children}
      </main>

    </div>
  );
}