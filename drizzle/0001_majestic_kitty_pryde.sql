ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1752378678;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" varchar(500);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "signature" varchar(250);