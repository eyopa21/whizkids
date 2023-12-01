alter table "public"."guests" add column "is_suspended" boolean
 not null default 'false';
