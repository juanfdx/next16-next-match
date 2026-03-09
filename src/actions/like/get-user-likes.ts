import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';
import { Result } from '@/utils/types';




export const getCurrentUserLikeIds = async (): Promise<Result<string[]>> => {
  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }


  try {
    // 2️⃣ Get user likes ids
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: session.user.id,
      },
      select: {
        targetUserId: true,
      },
    });

    // 3️⃣ Return user likes ids
    return ({
      success: true,
      data: likeIds.map((like) => like.targetUserId),
    })



  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }
};