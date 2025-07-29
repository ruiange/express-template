ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1753771750;--> statement-breakpoint
ALTER TABLE "wallpapers" ADD COLUMN "file_key" varchar(512);