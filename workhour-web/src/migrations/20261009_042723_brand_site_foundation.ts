import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_brand_pages_page_type" AS ENUM('page', 'service');
  CREATE TYPE "public"."enum_brand_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__brand_pages_v_version_page_type" AS ENUM('page', 'service');
  CREATE TYPE "public"."enum__brand_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "brand_pages_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "brand_pages_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "brand_pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "brand_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_id" integer,
  	"title" varchar,
  	"slug" varchar,
  	"page_type" "enum_brand_pages_page_type" DEFAULT 'page',
  	"display_order" numeric DEFAULT 0,
  	"eyebrow" varchar,
  	"summary" varchar,
  	"introduction" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_brand_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_brand_pages_v_version_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_brand_pages_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_brand_pages_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_brand_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_business_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_page_type" "enum__brand_pages_v_version_page_type" DEFAULT 'page',
  	"version_display_order" numeric DEFAULT 0,
  	"version_eyebrow" varchar,
  	"version_summary" varchar,
  	"version_introduction" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__brand_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "businesses" ADD COLUMN "brand_site_url" varchar;
  ALTER TABLE "businesses" ADD COLUMN "brand_primary_color" varchar DEFAULT '#071a31';
  ALTER TABLE "businesses" ADD COLUMN "brand_accent_color" varchar DEFAULT '#2baaa3';
  ALTER TABLE "businesses" ADD COLUMN "brand_background_color" varchar DEFAULT '#f8faf9';
  ALTER TABLE "_businesses_v" ADD COLUMN "version_brand_site_url" varchar;
  ALTER TABLE "_businesses_v" ADD COLUMN "version_brand_primary_color" varchar DEFAULT '#071a31';
  ALTER TABLE "_businesses_v" ADD COLUMN "version_brand_accent_color" varchar DEFAULT '#2baaa3';
  ALTER TABLE "_businesses_v" ADD COLUMN "version_brand_background_color" varchar DEFAULT '#f8faf9';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "brand_pages_id" integer;
  ALTER TABLE "brand_pages_sections_paragraphs" ADD CONSTRAINT "brand_pages_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_pages_sections_items" ADD CONSTRAINT "brand_pages_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_pages_sections" ADD CONSTRAINT "brand_pages_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand_pages_sections" ADD CONSTRAINT "brand_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_pages" ADD CONSTRAINT "brand_pages_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_pages_v_version_sections_paragraphs" ADD CONSTRAINT "_brand_pages_v_version_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brand_pages_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_pages_v_version_sections_items" ADD CONSTRAINT "_brand_pages_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brand_pages_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_pages_v_version_sections" ADD CONSTRAINT "_brand_pages_v_version_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_pages_v_version_sections" ADD CONSTRAINT "_brand_pages_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brand_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_pages_v" ADD CONSTRAINT "_brand_pages_v_parent_id_brand_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."brand_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_pages_v" ADD CONSTRAINT "_brand_pages_v_version_business_id_businesses_id_fk" FOREIGN KEY ("version_business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "brand_pages_sections_paragraphs_order_idx" ON "brand_pages_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "brand_pages_sections_paragraphs_parent_id_idx" ON "brand_pages_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "brand_pages_sections_items_order_idx" ON "brand_pages_sections_items" USING btree ("_order");
  CREATE INDEX "brand_pages_sections_items_parent_id_idx" ON "brand_pages_sections_items" USING btree ("_parent_id");
  CREATE INDEX "brand_pages_sections_order_idx" ON "brand_pages_sections" USING btree ("_order");
  CREATE INDEX "brand_pages_sections_parent_id_idx" ON "brand_pages_sections" USING btree ("_parent_id");
  CREATE INDEX "brand_pages_sections_image_idx" ON "brand_pages_sections" USING btree ("image_id");
  CREATE INDEX "brand_pages_business_idx" ON "brand_pages" USING btree ("business_id");
  CREATE INDEX "brand_pages_updated_at_idx" ON "brand_pages" USING btree ("updated_at");
  CREATE INDEX "brand_pages_created_at_idx" ON "brand_pages" USING btree ("created_at");
  CREATE INDEX "brand_pages__status_idx" ON "brand_pages" USING btree ("_status");
  CREATE UNIQUE INDEX "business_slug_idx" ON "brand_pages" USING btree ("business_id","slug");
  CREATE INDEX "_brand_pages_v_version_sections_paragraphs_order_idx" ON "_brand_pages_v_version_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "_brand_pages_v_version_sections_paragraphs_parent_id_idx" ON "_brand_pages_v_version_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_brand_pages_v_version_sections_items_order_idx" ON "_brand_pages_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_brand_pages_v_version_sections_items_parent_id_idx" ON "_brand_pages_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_brand_pages_v_version_sections_order_idx" ON "_brand_pages_v_version_sections" USING btree ("_order");
  CREATE INDEX "_brand_pages_v_version_sections_parent_id_idx" ON "_brand_pages_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_brand_pages_v_version_sections_image_idx" ON "_brand_pages_v_version_sections" USING btree ("image_id");
  CREATE INDEX "_brand_pages_v_parent_idx" ON "_brand_pages_v" USING btree ("parent_id");
  CREATE INDEX "_brand_pages_v_version_version_business_idx" ON "_brand_pages_v" USING btree ("version_business_id");
  CREATE INDEX "_brand_pages_v_version_version_updated_at_idx" ON "_brand_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_brand_pages_v_version_version_created_at_idx" ON "_brand_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_brand_pages_v_version_version__status_idx" ON "_brand_pages_v" USING btree ("version__status");
  CREATE INDEX "_brand_pages_v_created_at_idx" ON "_brand_pages_v" USING btree ("created_at");
  CREATE INDEX "_brand_pages_v_updated_at_idx" ON "_brand_pages_v" USING btree ("updated_at");
  CREATE INDEX "_brand_pages_v_latest_idx" ON "_brand_pages_v" USING btree ("latest");
  CREATE INDEX "version_business_version_slug_idx" ON "_brand_pages_v" USING btree ("version_business_id","version_slug");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brand_pages_fk" FOREIGN KEY ("brand_pages_id") REFERENCES "public"."brand_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_brand_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("brand_pages_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brand_pages_sections_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_pages_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_pages_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_pages_v_version_sections_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_pages_v_version_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_pages_v_version_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "brand_pages_sections_paragraphs" CASCADE;
  DROP TABLE "brand_pages_sections_items" CASCADE;
  DROP TABLE "brand_pages_sections" CASCADE;
  DROP TABLE "brand_pages" CASCADE;
  DROP TABLE "_brand_pages_v_version_sections_paragraphs" CASCADE;
  DROP TABLE "_brand_pages_v_version_sections_items" CASCADE;
  DROP TABLE "_brand_pages_v_version_sections" CASCADE;
  DROP TABLE "_brand_pages_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_brand_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_brand_pages_id_idx";
  ALTER TABLE "businesses" DROP COLUMN "brand_site_url";
  ALTER TABLE "businesses" DROP COLUMN "brand_primary_color";
  ALTER TABLE "businesses" DROP COLUMN "brand_accent_color";
  ALTER TABLE "businesses" DROP COLUMN "brand_background_color";
  ALTER TABLE "_businesses_v" DROP COLUMN "version_brand_site_url";
  ALTER TABLE "_businesses_v" DROP COLUMN "version_brand_primary_color";
  ALTER TABLE "_businesses_v" DROP COLUMN "version_brand_accent_color";
  ALTER TABLE "_businesses_v" DROP COLUMN "version_brand_background_color";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "brand_pages_id";
  DROP TYPE "public"."enum_brand_pages_page_type";
  DROP TYPE "public"."enum_brand_pages_status";
  DROP TYPE "public"."enum__brand_pages_v_version_page_type";
  DROP TYPE "public"."enum__brand_pages_v_version_status";`)
}
