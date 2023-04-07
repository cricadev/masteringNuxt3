/*
  Warnings:

  - Changed the type of `videoId` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "videoId",
ADD COLUMN     "videoId" INTEGER NOT NULL;
