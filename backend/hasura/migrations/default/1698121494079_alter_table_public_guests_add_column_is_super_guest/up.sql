alter table "public"."guests" add column "is_super_guest" boolean
 not null default 'false';
