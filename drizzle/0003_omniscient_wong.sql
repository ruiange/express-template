ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1753768904;--> statement-breakpoint
ALTER TABLE "wallpapers" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wallpapers" ALTER COLUMN "thumbnail_path" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wallpapers" ALTER COLUMN "file_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wallpapers" ALTER COLUMN "upload_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wallpapers" ALTER COLUMN "view_count" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wallpapers" ALTER COLUMN "download_count" DROP NOT NULL;