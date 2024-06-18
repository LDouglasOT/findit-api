-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
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
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("color", "created", "description", "discount", "id", "image", "price", "productName", "quantity", "shopId", "size") SELECT "color", "created", "description", "discount", "id", "image", "price", "productName", "quantity", "shopId", "size" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
