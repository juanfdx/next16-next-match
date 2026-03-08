

## Prisma Schema for the future App
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}


// USER
enum Role {
  admin
  user
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

// NOTIFICATION
enum NotificationType {
  LIKE
  MATCH
  MESSAGE
}


model User {
  id            String     @id @default(uuid())
  firstName     String?
  lastName      String?
  username      String?    @unique
  email         String     @unique
  emailVerified DateTime?
  password      String
  image         String?
  role          Role       @default(user)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  // Likes
  likesSent     Like[] @relation("LikesSent")
  likesReceived Like[] @relation("LikesReceived")

  // Matches
  matchesA Match[] @relation("MatchUserA")
  matchesB Match[] @relation("MatchUserB")

  // Messages
  messages Message[]

  // Blocks
  blocksSent     Block[] @relation("BlocksSent")
  blocksReceived Block[] @relation("BlocksReceived")

  // Notifications
  notifications Notification[]
}


// Stores every like action.
model Like {
  id         String   @id @default(cuid())
  createdAt  DateTime @default(now())

  likerId    String
  likedId    String

  liker      User @relation("LikesSent", fields: [likerId], references: [id])
  liked      User @relation("LikesReceived", fields: [likedId], references: [id])

  @@unique([likerId, likedId])
}


//Created only when both users like each other.
model Match {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  userAId String
  userBId String

  userA User @relation("MatchUserA", fields: [userAId], references: [id])
  userB User @relation("MatchUserB", fields: [userBId], references: [id])

  messages Message[]

  @@unique([userAId, userBId])
}

// Best practice when inserting:
// userAId = min(user1, user2)
// userBId = max(user1, user2)

// Messages belong to a match conversation.
model Message {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())

  senderId String
  matchId  String

  sender User  @relation(fields: [senderId], references: [id])
  match  Match @relation(fields: [matchId], references: [id])
}


// Allows users to block others.
model Block {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  blockerId String
  blockedId String

  blocker User @relation("BlocksSent", fields: [blockerId], references: [id])
  blocked User @relation("BlocksReceived", fields: [blockedId], references: [id])

  @@unique([blockerId, blockedId])
}


model Notification {
  id        String   @id @default(cuid())
  type      NotificationType
  createdAt DateTime @default(now())
  read      Boolean  @default(false)

  userId String
  user   User @relation(fields: [userId], references: [id])

  // optional references
  fromUserId String?
  matchId    String?
  messageId  String?
}
