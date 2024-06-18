-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productName" TEXT NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "shopId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "size" TEXT,
    "color" TEXT,
    "description" TEXT,
    "image" TEXT,
    CONSTRAINT "Products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
