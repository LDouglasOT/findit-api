-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderHash" TEXT;

-- CreateTable
CREATE TABLE "OrderDetails" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productName" TEXT NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "shopId" INTEGER NOT NULL,
    "orderHash" TEXT,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("id")
);
