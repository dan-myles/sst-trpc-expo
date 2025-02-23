ALTER TABLE "post" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;