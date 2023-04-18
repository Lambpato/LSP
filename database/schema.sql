set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"loggedInAt" TIMESTAMP NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."images" (
	"imageId" serial NOT NULL,
	"userId" INTEGER NOT NULL,
	"url" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."songs" (
	"songId" serial NOT NULL,
	"userId" INTEGER NOT NULL,
	"url" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("songId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "songs" ADD CONSTRAINT "songs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
