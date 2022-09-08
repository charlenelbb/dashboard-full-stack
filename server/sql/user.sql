DROP TABLE IF EXISTS "dashboard_users";

CREATE TABLE "dashboard_users" (
  "id" SERIAL,
  "username" VARCHAR(100) NOT NULL,
  "password" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  PRIMARY KEY ("id")
);