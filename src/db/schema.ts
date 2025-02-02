import { sql } from "drizzle-orm";
import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

//  Users table
export const Users = pgTable("users", {
  id: text("user-id").primaryKey(),
  firstName: text("first-name").notNull(),
  lastName: text("last-name").notNull(),
});

export const Projects = pgTable("projects", {
  id: serial("project-id").primaryKey(),
  name: text("project-name").notNull(),
  developmentStage: text("development-stage").notNull(),
  description: text("description").notNull(),
  size: serial("size").notNull(),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  institution: text("institution").notNull(),
  startDate: date("date", { mode: "date" }).notNull(),

  linkedIn: text("linked-in"),
  valueProposition: text("value-proposition"),
  problemStatement: text("problem-statement"),
  tagline: text("tagline"),
  videoDemo: text("video-demo"),
});

export const ProjectMembers = pgTable("project-members", {
  id: serial("member-id").primaryKey(),
  projectId: serial("project-id").references(() => Projects.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  userId: text("user-id").references(() => Users.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
});

export const Events = pgTable("events", {
  id: serial("event-id").primaryKey(),
  name: text("event-name").notNull(),
  description: text("description").notNull(),
  postedBy: text("posted-by").references(() => Users.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  startDate: timestamp("start-date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  endDate: timestamp("end-date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  eventBanner: text("event-banner"),
});

export const EventAttendees = pgTable("event-attendees", {
  id: serial("attendee-id").primaryKey(),
  eventId: serial("event-id").references(() => Events.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  userId: text("user-id").references(() => Users.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
});
