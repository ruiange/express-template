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
	"role" varchar(5) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"create_time" integer DEFAULT 1751802631 NOT NULL,
	"openid" varchar(255),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_openid_unique" UNIQUE("openid")
);
--> statement-breakpoint
CREATE TABLE "config" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"auditConfig" boolean DEFAULT false,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
