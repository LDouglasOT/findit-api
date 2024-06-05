-- CreateTable
CREATE TABLE "Login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PhoneNumber" TEXT,
    "Password" TEXT NOT NULL,
    "token" TEXT,
    "refreshToken" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
