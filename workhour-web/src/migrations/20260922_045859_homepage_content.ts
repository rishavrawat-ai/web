import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_businesses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__businesses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_media_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_alt" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__media_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "businesses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"name" varchar,
  	"homepage_introduction" varchar,
  	"detailed_introduction" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"website_url" varchar,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_businesses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_businesses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_name" varchar,
  	"version_homepage_introduction" varchar,
  	"version_detailed_introduction" varchar,
  	"version_logo_id" integer,
  	"version_image_id" integer,
  	"version_website_url" varchar,
  	"version_display_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__businesses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "homepage_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'About Us',
  	"cta_url" varchar
  );
  
  CREATE TABLE "homepage_businesses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"business_id" integer
  );
  
  CREATE TABLE "homepage_value_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_media_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_heading" varchar,
  	"intro_description" varchar,
  	"featured_announcement_heading" varchar,
  	"featured_announcement_description" varchar,
  	"featured_announcement_image_id" integer,
  	"featured_announcement_label" varchar,
  	"featured_announcement_url" varchar,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_homepage_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'About Us',
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_businesses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_value_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_media_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_intro_heading" varchar,
  	"version_intro_description" varchar,
  	"version_featured_announcement_heading" varchar,
  	"version_featured_announcement_description" varchar,
  	"version_featured_announcement_image_id" integer,
  	"version_featured_announcement_label" varchar,
  	"version_featured_announcement_url" varchar,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "businesses_id" integer;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses" ADD CONSTRAINT "businesses_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses" ADD CONSTRAINT "businesses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_parent_id_businesses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_businesses_fk" FOREIGN KEY ("businesses_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_slides" ADD CONSTRAINT "homepage_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_slides" ADD CONSTRAINT "homepage_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_businesses" ADD CONSTRAINT "homepage_businesses_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_businesses" ADD CONSTRAINT "homepage_businesses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_value_panels" ADD CONSTRAINT "homepage_value_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_media_cards" ADD CONSTRAINT "homepage_media_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_media_cards" ADD CONSTRAINT "homepage_media_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_featured_announcement_image_id_media_id_fk" FOREIGN KEY ("featured_announcement_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_slides" ADD CONSTRAINT "_homepage_v_version_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_slides" ADD CONSTRAINT "_homepage_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_businesses" ADD CONSTRAINT "_homepage_v_version_businesses_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_businesses" ADD CONSTRAINT "_homepage_v_version_businesses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_value_panels" ADD CONSTRAINT "_homepage_v_version_value_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_media_cards" ADD CONSTRAINT "_homepage_v_version_media_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_media_cards" ADD CONSTRAINT "_homepage_v_version_media_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_featured_announcement_image_id_media_id_fk" FOREIGN KEY ("version_featured_announcement_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media__status_idx" ON "media" USING btree ("_status");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version__status_idx" ON "_media_v" USING btree ("version__status");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_media_v_latest_idx" ON "_media_v" USING btree ("latest");
  CREATE UNIQUE INDEX "businesses_slug_idx" ON "businesses" USING btree ("slug");
  CREATE INDEX "businesses_logo_idx" ON "businesses" USING btree ("logo_id");
  CREATE INDEX "businesses_image_idx" ON "businesses" USING btree ("image_id");
  CREATE INDEX "businesses_updated_at_idx" ON "businesses" USING btree ("updated_at");
  CREATE INDEX "businesses_created_at_idx" ON "businesses" USING btree ("created_at");
  CREATE INDEX "businesses__status_idx" ON "businesses" USING btree ("_status");
  CREATE INDEX "_businesses_v_parent_idx" ON "_businesses_v" USING btree ("parent_id");
  CREATE INDEX "_businesses_v_version_version_slug_idx" ON "_businesses_v" USING btree ("version_slug");
  CREATE INDEX "_businesses_v_version_version_logo_idx" ON "_businesses_v" USING btree ("version_logo_id");
  CREATE INDEX "_businesses_v_version_version_image_idx" ON "_businesses_v" USING btree ("version_image_id");
  CREATE INDEX "_businesses_v_version_version_updated_at_idx" ON "_businesses_v" USING btree ("version_updated_at");
  CREATE INDEX "_businesses_v_version_version_created_at_idx" ON "_businesses_v" USING btree ("version_created_at");
  CREATE INDEX "_businesses_v_version_version__status_idx" ON "_businesses_v" USING btree ("version__status");
  CREATE INDEX "_businesses_v_created_at_idx" ON "_businesses_v" USING btree ("created_at");
  CREATE INDEX "_businesses_v_updated_at_idx" ON "_businesses_v" USING btree ("updated_at");
  CREATE INDEX "_businesses_v_latest_idx" ON "_businesses_v" USING btree ("latest");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_businesses_id_idx" ON "payload_locked_documents_rels" USING btree ("businesses_id");
  CREATE INDEX "homepage_hero_slides_order_idx" ON "homepage_hero_slides" USING btree ("_order");
  CREATE INDEX "homepage_hero_slides_parent_id_idx" ON "homepage_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_slides_image_idx" ON "homepage_hero_slides" USING btree ("image_id");
  CREATE INDEX "homepage_businesses_order_idx" ON "homepage_businesses" USING btree ("_order");
  CREATE INDEX "homepage_businesses_parent_id_idx" ON "homepage_businesses" USING btree ("_parent_id");
  CREATE INDEX "homepage_businesses_business_idx" ON "homepage_businesses" USING btree ("business_id");
  CREATE INDEX "homepage_value_panels_order_idx" ON "homepage_value_panels" USING btree ("_order");
  CREATE INDEX "homepage_value_panels_parent_id_idx" ON "homepage_value_panels" USING btree ("_parent_id");
  CREATE INDEX "homepage_media_cards_order_idx" ON "homepage_media_cards" USING btree ("_order");
  CREATE INDEX "homepage_media_cards_parent_id_idx" ON "homepage_media_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_media_cards_image_idx" ON "homepage_media_cards" USING btree ("image_id");
  CREATE INDEX "homepage_featured_announcement_featured_announcement_ima_idx" ON "homepage" USING btree ("featured_announcement_image_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE INDEX "_homepage_v_version_hero_slides_order_idx" ON "_homepage_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_hero_slides_parent_id_idx" ON "_homepage_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_hero_slides_image_idx" ON "_homepage_v_version_hero_slides" USING btree ("image_id");
  CREATE INDEX "_homepage_v_version_businesses_order_idx" ON "_homepage_v_version_businesses" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_businesses_parent_id_idx" ON "_homepage_v_version_businesses" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_businesses_business_idx" ON "_homepage_v_version_businesses" USING btree ("business_id");
  CREATE INDEX "_homepage_v_version_value_panels_order_idx" ON "_homepage_v_version_value_panels" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_value_panels_parent_id_idx" ON "_homepage_v_version_value_panels" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_media_cards_order_idx" ON "_homepage_v_version_media_cards" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_media_cards_parent_id_idx" ON "_homepage_v_version_media_cards" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_media_cards_image_idx" ON "_homepage_v_version_media_cards" USING btree ("image_id");
  CREATE INDEX "_homepage_v_version_featured_announcement_version_featur_idx" ON "_homepage_v" USING btree ("version_featured_announcement_image_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "_homepage_v" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_media_cards" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_value_panels" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_businesses" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_hero_slides" CASCADE;
  DROP TABLE IF EXISTS "homepage" CASCADE;
  DROP TABLE IF EXISTS "homepage_media_cards" CASCADE;
  DROP TABLE IF EXISTS "homepage_value_panels" CASCADE;
  DROP TABLE IF EXISTS "homepage_businesses" CASCADE;
  DROP TABLE IF EXISTS "homepage_hero_slides" CASCADE;
  DROP TABLE IF EXISTS "_businesses_v" CASCADE;
  DROP TABLE IF EXISTS "businesses" CASCADE;
  DROP TABLE IF EXISTS "_media_v" CASCADE;
  DROP TABLE IF EXISTS "media" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "businesses_id";
  DROP TYPE IF EXISTS "public"."enum__homepage_v_version_status";
  DROP TYPE IF EXISTS "public"."enum_homepage_status";
  DROP TYPE IF EXISTS "public"."enum__businesses_v_version_status";
  DROP TYPE IF EXISTS "public"."enum_businesses_status";
  DROP TYPE IF EXISTS "public"."enum__media_v_version_status";
  DROP TYPE IF EXISTS "public"."enum_media_status";`)
}
