'use server';

import prisma from "../db";

export async function getUserByClerkId(userId: string) {
  try {
    const user = await prisma.customer.findFirst({
      where: { clerk_user_id: userId }
    })

    return { user };
  } catch (err) {
    console.log('Error fetching user', err)
  }
}