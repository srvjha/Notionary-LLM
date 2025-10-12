-- CreateEnum
CREATE TYPE "public"."ChatSessionStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."ChatSession" ADD COLUMN     "chatSessionStatus" "public"."ChatSessionStatus" NOT NULL DEFAULT 'ACTIVE';
