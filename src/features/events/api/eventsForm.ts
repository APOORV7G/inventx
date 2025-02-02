"use server";
import { createClient } from "@/db";
import { Events } from '@/db/schema';
import { insertEvents } from '@/db/types';
export interface formValues {
  userId: string;
  eventName: string;
  eventDescription: string;
  startDate: Date;
  endDate: Date;
}
export async function createEvent( values : formValues ) {
    const db = await createClient()
    const Event : insertEvents = {
        name: values.eventName,
        description: values.eventDescription,
        postedBy: values.userId,
        startDate: values.startDate,
        endDate: values.endDate
    }
    const event = await db
      .insert(Events)
      .values(Event)
      .onConflictDoUpdate({
        target: Events.id,
        set: Event
      })
    if (event) {
        return { success: true }
    }
   throw new Error("Failed to create event")
}
