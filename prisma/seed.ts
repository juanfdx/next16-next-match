import { membersData } from '@/data/data-members';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';



async function main() {
for (const member of membersData) {
  const hashedPassword = await hash(member.password || 'password', 10);

  await prisma.user.create({
    data: {
      email: member.email,
      username: member.username,
      name: member.name,
      password: hashedPassword,
      gender: member.gender,
      dateOfBirth: new Date(member.dateOfBirth),
      description: member.description,
      city: member.city,
      country: member.country,
      image: member.image,
      role: 'user',
      emailVerified: member.emailVerified ? new Date(member.emailVerified) : null,
      lastActive: new Date(member.lastActive),
      photos: {
        create: member.image ? [{ url: member.image }] : [],
      },
    },
  });
}

  console.log('Database seeded ✅');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });