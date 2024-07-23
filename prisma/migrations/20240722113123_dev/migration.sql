/*
  Warnings:

  - Added the required column `Name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhoneNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "PhoneNumber" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "orderStatus" BOOLEAN NOT NULL DEFAULT false;
