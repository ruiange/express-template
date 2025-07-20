CREATE TABLE "wallpapers_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallpapers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"file_path" varchar(512) NOT NULL,
	"thumbnail_path" varchar(512) NOT NULL,
	"file_size" integer,
	"width" integer,
	"height" integer,
	"file_type" varchar(50) NOT NULL,
	"upload_date" timestamp DEFAULT now() NOT NULL,
	"category_id" integer,
	"is_public" boolean DEFAULT true NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"download_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1753003676;--> statement-breakpoint
ALTER TABLE "wallpapers" ADD CONSTRAINT "wallpapers_category_id_wallpapers_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."wallpapers_categories"("id") ON DELETE no action ON UPDATE no action;