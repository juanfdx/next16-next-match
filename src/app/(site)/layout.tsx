import { Navbar } from '@/components/navbar/Navbar';




//"lrc" snippet
export default function SiteLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='container mx-auto px-7 py-10'>{children}</main> 
    </>
  );
}