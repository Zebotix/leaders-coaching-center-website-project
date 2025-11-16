/*
  Warnings:

  - You are about to drop the `FAQs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FAQs" DROP CONSTRAINT "FAQs_userId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "resourceId" TEXT;

-- DropTable
DROP TABLE "FAQs";

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
