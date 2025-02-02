import { createClient } from "@/db";
import { Users } from "@/db/schema";

export async function createUser(id: string, fname: string, lname: string) {
  const db = await createClient();
  const [user] = await db
    .insert(Users)
    .values({
      id,
      firstName: fname,
      lastName: lname,
    })
    .onConflictDoNothing()
    .returning();
  return user !== undefined;
}
