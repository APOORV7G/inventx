import { ProjectMembers, Users, Projects, Events, EventAttendees } from './schema';

export type selectProjectMembers = typeof ProjectMembers.$inferSelect;
export type selectUsers = typeof Users.$inferSelect;
export type selectProjects = typeof Projects.$inferSelect;
export type selectEvents = typeof Events.$inferSelect;
export type selectEventAttendees = typeof EventAttendees.$inferSelect;

export type insertProjectMembers = typeof ProjectMembers.$inferInsert;
export type insertUsers = typeof Users.$inferInsert;
export type insertProjects = typeof Projects.$inferInsert;
export type insertEvents = typeof Events.$inferInsert;
export type insertEventAttendees = typeof EventAttendees.$inferInsert;

