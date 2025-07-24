CREATE TABLE "logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"method" varchar(10) NOT NULL,
	"url" varchar(255) NOT NULL,
	"status_code" integer NOT NULL,
	"ip" varchar(45) NOT NULL,
	"user_agent" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "douyin" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "douyin_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"jsonData" jsonb
);
--> statement-breakpoint
CREATE TABLE "jiuyin_news" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jiuyin_news_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"news_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" varchar,
	"type" varchar(255),
	"url" varchar,
	"time" varchar
);
--> statement-breakpoint
CREATE TABLE "wealth" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "wealth_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"openid" varchar(255) NOT NULL,
	"count" numeric(20, 2) DEFAULT '0' NOT NULL,
	"muyu" numeric(20, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "wealth_openid_unique" UNIQUE("openid")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255),
	"password" varchar(255),
	"email" varchar(255),
	"nickname" varchar(255),
	"avatar" varchar(255),
	"membership" integer DEFAULT 0 NOT NULL,
	"role" varchar(5) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"create_time" integer DEFAULT 1753343020 NOT NULL,
	"openid" varchar(255),
	"unionid" varchar(255),
	"bio" varchar(500),
	"signature" varchar(250),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_openid_unique" UNIQUE("openid"),
	CONSTRAINT "users_unionid_unique" UNIQUE("unionid")
);
--> statement-breakpoint
CREATE TABLE "config" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"auditConfig" boolean DEFAULT false,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "questions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "questions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255),
	"desc" text,
	"answer" text,
	"analysis" text,
	"difficulty" integer DEFAULT 3 NOT NULL,
	"category" varchar(100),
	"tags" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wallpapers" ADD CONSTRAINT "wallpapers_category_id_wallpapers_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."wallpapers_categories"("id") ON DELETE no action ON UPDATE no action;