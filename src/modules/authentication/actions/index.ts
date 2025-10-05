"use server";

import { db } from "@/db";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export const currentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
     
    if (!session?.user?.id) {
      return null;
    }
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in currentUser function", error);
    return null;
  }
};
