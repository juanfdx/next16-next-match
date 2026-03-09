'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';



export const toggleLike = async (targetUserId: string, isLiked: boolean) => {
  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }

  try {
    if(isLiked) {
      // 2️⃣ Remove like
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: session.user.id,
            targetUserId: targetUserId,
          },
        },
      });
    } else {
      // 3️⃣ Add like
      await prisma.like.create({
        data: {
          sourceUserId: session.user.id,
          targetUserId: targetUserId,
        },
      });
    }
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }
}