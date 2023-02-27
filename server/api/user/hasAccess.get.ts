import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type User = {
  email: string;
};

export default defineEventHandler(async (event) => {
  const user = event.context.user as User;

  // No user is logged in
  if (!user) {
    return false;
  }

  const coursePurchases =
    await prisma.coursePurchase.findMany({
      where: {
        userEmail: user.email,
        verified: true,
        // Hard coded course ID
        courseId: 1,
      },
    });

  // This user has purchased the course
  return coursePurchases.length > 0;
});
