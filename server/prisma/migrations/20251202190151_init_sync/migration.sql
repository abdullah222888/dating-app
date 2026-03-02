-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('basic', 'premium');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('married', 'unmarried', 'prefer_not_say', 'seperated');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('sending', 'delivered', 'Read', 'failed');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('text', 'voice', 'photo', 'emoji', 'gifs');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('pending', 'approved');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('new_match', 'new_message', 'like_found');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_no" INTEGER,
    "is_verified" BOOLEAN,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "userType" "UserType",
    "likesCount" INTEGER[],
    "dislikesCount" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "dob" TEXT NOT NULL,
    "profile_photo" TEXT NOT NULL,
    "background_img" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "location" TEXT[],
    "marital_status" "MaritalStatus" NOT NULL,
    "children" INTEGER NOT NULL,
    "preferred_family_system" TEXT NOT NULL,
    "requirements" TEXT[],
    "deal_breakers" TEXT NOT NULL,
    "timeframe_for_marriage" TEXT NOT NULL,
    "family_details" TEXT[],
    "hobbies" TEXT[],
    "interests" TEXT[],
    "distance" TEXT NOT NULL,
    "media" TEXT[],
    "isFeatured" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "liked_by" TEXT NOT NULL,
    "liked_to" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "user_one" TEXT,
    "user_two" TEXT,
    "chat_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "match_id" TEXT,
    "participant_one" TEXT,
    "participant_two" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT,
    "sender_id" TEXT,
    "receiver_id" TEXT,
    "status" "MessageStatus",
    "type" "MessageType",
    "content" TEXT NOT NULL,
    "media_url" TEXT,
    "is_deleted" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportList" (
    "id" TEXT NOT NULL,
    "reporter_id" TEXT,
    "reported_user_id" TEXT,
    "message_id" TEXT,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ReportStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocklist" (
    "id" TEXT NOT NULL,
    "blocker_id" TEXT,
    "blocked_user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blocklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "user_relating" TEXT,
    "title" TEXT,
    "description" TEXT,
    "type" "NotificationType",
    "isRead" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terms" (
    "id" TEXT NOT NULL,
    "terms_details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacyPolicy" (
    "id" TEXT NOT NULL,
    "policies" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivacyPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guidelines" (
    "id" TEXT NOT NULL,
    "guidelines" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guidelines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_user_id_key" ON "UserDetails"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_match_id_key" ON "Chat"("match_id");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_liked_by_fkey" FOREIGN KEY ("liked_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_liked_to_fkey" FOREIGN KEY ("liked_to") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_user_one_fkey" FOREIGN KEY ("user_one") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_user_two_fkey" FOREIGN KEY ("user_two") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_participant_one_fkey" FOREIGN KEY ("participant_one") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_participant_two_fkey" FOREIGN KEY ("participant_two") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportList" ADD CONSTRAINT "ReportList_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportList" ADD CONSTRAINT "ReportList_reported_user_id_fkey" FOREIGN KEY ("reported_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportList" ADD CONSTRAINT "ReportList_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocklist" ADD CONSTRAINT "Blocklist_blocked_user_id_fkey" FOREIGN KEY ("blocked_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocklist" ADD CONSTRAINT "Blocklist_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_relating_fkey" FOREIGN KEY ("user_relating") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
