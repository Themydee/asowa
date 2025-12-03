CREATE TABLE "designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric NOT NULL,
	"image" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "fullname";