import Image from 'next/image';
import { requireAuth } from '@/lib/requireAuth';
// actions
import { getUserPhotos } from '@/actions/user/get-user-photos';
// components
import { EmptyState } from '@/components/system/EmptyState';
import { CheckButton } from '@/components/ui/CheckButton';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { UploadPhotoButton } from '@/components/ui/UploadPhotoButton';



export default async function PhotosPage() {

  const session = await requireAuth();
  const userId = session?.user?.id;

  const response = await getUserPhotos();

  if (!response.success) {
    return (
      <EmptyState
        title="Request Failed"
        description={response.error ?? "Unable to load photos"}
        actionLabel="Back to Members"
        actionHref="/members"
      />
    );
  }
    
  const { photos } = response.data;
  
  if (photos.length === 0) {
    return (
      <EmptyState
        description="This user has no photos"
        actionLabel="Back to Members"
        actionHref="/members"
      />
    );
  }

  

  return (
    <div>
      <h1 className='text-xl font-semibold text-center text-white uppercase py-2 bg-linear-to-r from-purple-500 to-pink-500'>
         Photos
      </h1>
      
      <div className='p-4'>
        <UploadPhotoButton userId={userId} />
      </div>

      {/* info */}
      <div className='p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        {photos.map((photo) => (
          <div key={photo.id} className='relative overflow-hidden rounded-2xl border-2 border-gray-200' >
            <Image 
              src={photo.url}
              alt={photo.url}
              width={100}
              height={100} 
              className='w-full h-full object-cover' 
              priority
            />
            <CheckButton />
            <DeleteButton photoId={photo.id} />
          </div>
        ))}
      </div>
      
    </div>
  );
}