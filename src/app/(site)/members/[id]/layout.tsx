


export default function MemberLayout({
 children,
 params
}: {
 children: React.ReactNode;
 params: { userId: string };
}) {
  return (
    <>
      <h1>Member Layout</h1>
      {children}
    </>
  );
}