/*
  Warnings:

  - You are about to drop the column `userId` on the `devices` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_userId_fkey";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
