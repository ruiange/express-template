CREATE TABLE "file_resources" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "file_resources_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(500) NOT NULL,
	"file_key" varchar(500),
	"file_size" integer,
	"mime_type" varchar(100),
	"storage_provider" varchar(50) NOT NULL,
	"storage_path" varchar(500),
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"can_delete" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "create_time" SET DEFAULT 1753761407;