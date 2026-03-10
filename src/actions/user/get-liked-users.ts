import { Result } from '@/utils/types';
import { auth } from '../../../auth';
import { prisma } from '@/lib/prisma';




// return a list of users that the current user has liked
export const getLikedUsers = async (type = 'source') => {
  
  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }


  try {

    switch (type) {
      case 'source':
        return await getSourceLikes(session.user.id);
      case 'target':
        return await getTargetLikes(session.user.id);
      case 'mutual':
        return await getMutualLikes(session.user.id);
      default:
        return [];
    }


    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };  
  }
}


const getSourceLikes = async (userId: string) => {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });

  return sourceList.map((x) => x.targetMember);
}


const getTargetLikes = async (userId: string) => {
    const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });

  return targetList.map((x) => x.sourceMember);
}


const getMutualLikes = async (userId: string) => {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });

  const likedIds = likedUsers.map((x) => x.targetUserId);

  const mutualList = await prisma.like.findMany({
    where: { sourceUserId: { in: likedIds }, targetUserId: userId },
    select: { sourceMember: true },
  });

  return mutualList.map((x) => x.sourceMember);
}

