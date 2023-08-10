-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_user_id_fkey";

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
