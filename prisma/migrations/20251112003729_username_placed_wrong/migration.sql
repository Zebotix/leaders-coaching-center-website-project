/*
  Warnings:

  - You are about to drop the column `username` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "username" TEXT;
