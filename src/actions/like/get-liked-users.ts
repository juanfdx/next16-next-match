'use server';

import { Member, Result } from '@/utils/types';
import { auth } from '../../../auth';
import { prisma } from '@/lib/prisma';




// return a list of users that the current user has liked
export const getLikedUsers = async (type = 'source'): Promise<Result<Member[]>> => {
  
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
        return {
          success: false,
          error: 'Invalid type parameter',
        };
    }


    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };  
  }
}


const getSourceLikes = async (userId: string): Promise<Result<Member[]>> => {

  try {
    const sourceList = await prisma.like.findMany({
      where: { sourceUserId: userId },
      select: { 
        targetMember: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            dateOfBirth: true,
            gender: true,
            description: true,
            city: true,
            country: true,
            createdAt: true,
          },
        }, 
      },
    });
  
    return {
      success: true,
      data: sourceList.map((x) => x.targetMember),
    };
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };  
  }
}


const getTargetLikes = async (userId: string): Promise<Result<Member[]>> => {
  try { 
    const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { 
      sourceMember: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          dateOfBirth: true,
          gender: true,
          description: true,
          city: true,
          country: true,
          createdAt: true,
        },
      }
    },
  });

  return {
    success: true,
    data: targetList.map((x) => x.sourceMember),
  }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }
}


const getMutualLikes = async (userId: string): Promise<Result<Member[]>> => {

  try {
    const likedUsers = await prisma.like.findMany({
      where: { sourceUserId: userId },
      select: { targetUserId: true },
    });
  
    const likedIds = likedUsers.map((x) => x.targetUserId);
  
    const mutualList = await prisma.like.findMany({
      where: { sourceUserId: { in: likedIds }, targetUserId: userId },
      select: { 
        sourceMember: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            dateOfBirth: true,
            gender: true,
            description: true,
            city: true,
            country: true,
            createdAt: true,
          },
        } 
      },
    });
  
    return {
      success: true,
      data: mutualList.map((x) => x.sourceMember),
    }
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }
}

