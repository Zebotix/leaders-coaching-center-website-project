/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "FAQs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FAQs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FAQs" ADD CONSTRAINT "FAQs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
