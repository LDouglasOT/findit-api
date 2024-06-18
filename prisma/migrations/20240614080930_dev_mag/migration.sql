/*
  Warnings:

  - Added the required column `FirstName` to the `Login` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `Login` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopName" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile" TEXT NOT NULL,
    "subscription" TEXT NOT NULL,
    "loginId" INTEGER NOT NULL,
    CONSTRAINT "Shop_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "header" TEXT NOT NULL,
    "global" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seen" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PhoneNumber" TEXT,
    "Password" TEXT NOT NULL,
    "token" TEXT,
    "refreshToken" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME
);
INSERT INTO "new_Login" ("Password", "PhoneNumber", "created", "id", "refreshToken", "token") SELECT "Password", "PhoneNumber", "created", "id", "refreshToken", "token" FROM "Login";
DROP TABLE "Login";
ALTER TABLE "new_Login" RENAME TO "Login";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
