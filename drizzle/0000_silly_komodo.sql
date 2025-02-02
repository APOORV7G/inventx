CREATE TABLE "event-attendees" (
	"attendee-id" serial PRIMARY KEY NOT NULL,
	"event-id" serial NOT NULL,
	"user-id" text
);
--> statement-breakpoint
CREATE TABLE "events" (
	"event-id" serial PRIMARY KEY NOT NULL,
	"event-name" text NOT NULL,
	"description" text NOT NULL,
	"posted-by" text,
	"start-date" date NOT NULL,
	"end-date" date NOT NULL,
	"event-banner" text
);
--> statement-breakpoint
CREATE TABLE "project-members" (
	"member-id" serial PRIMARY KEY NOT NULL,
	"project-id" serial NOT NULL,
	"user-id" text
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"project-id" serial PRIMARY KEY NOT NULL,
	"project-name" text NOT NULL,
	"development-stage" text NOT NULL,
	"description" text NOT NULL,
	"size" serial NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"institution" text NOT NULL,
	"date" date NOT NULL,
	"linked-in" text,
	"value-proposition" text,
	"problem-statement" text,
	"tagline" text,
	"video-demo" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user-id" text PRIMARY KEY NOT NULL,
	"first-name" text NOT NULL,
	"last-name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event-attendees" ADD CONSTRAINT "event-attendees_event-id_events_event-id_fk" FOREIGN KEY ("event-id") REFERENCES "public"."events"("event-id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "event-attendees" ADD CONSTRAINT "event-attendees_user-id_users_user-id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("user-id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_posted-by_users_user-id_fk" FOREIGN KEY ("posted-by") REFERENCES "public"."users"("user-id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project-members" ADD CONSTRAINT "project-members_project-id_projects_project-id_fk" FOREIGN KEY ("project-id") REFERENCES "public"."projects"("project-id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project-members" ADD CONSTRAINT "project-members_user-id_users_user-id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("user-id") ON DELETE cascade ON UPDATE cascade;