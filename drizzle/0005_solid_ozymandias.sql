ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1753322545;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "membership" integer DEFAULT 0 NOT NULL;