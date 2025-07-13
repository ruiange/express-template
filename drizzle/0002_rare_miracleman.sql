ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1752383000;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "unionid" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_unionid_unique" UNIQUE("unionid");