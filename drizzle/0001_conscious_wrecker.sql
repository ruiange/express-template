ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1753344456;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "difficulty" DROP NOT NULL;