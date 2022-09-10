-- CreateEnum
CREATE TYPE "TimeState" AS ENUM ('STOPPED', 'ACTIVE');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "time" INTEGER NOT NULL DEFAULT 1,
    "timeState" "TimeState" NOT NULL DEFAULT 'STOPPED',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "StreamLabsToken" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "socketToken" TEXT NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streamLabsUser" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StreamLabsToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimerSettings" (
    "id" TEXT NOT NULL,
    "totalDonations" INTEGER NOT NULL DEFAULT 0,
    "totalMembers" INTEGER NOT NULL DEFAULT 0,
    "totalSuperchat" INTEGER NOT NULL DEFAULT 0,
    "donationsOn" BOOLEAN NOT NULL DEFAULT false,
    "subscribersOn" BOOLEAN NOT NULL DEFAULT false,
    "membersOn" BOOLEAN NOT NULL DEFAULT false,
    "superchatOn" BOOLEAN NOT NULL DEFAULT false,
    "perDonation" INTEGER NOT NULL DEFAULT 1,
    "secondsDonation" INTEGER NOT NULL DEFAULT 0,
    "perSuperchat" INTEGER NOT NULL DEFAULT 1,
    "secondsSuperchat" INTEGER NOT NULL DEFAULT 0,
    "member1Name" TEXT NOT NULL DEFAULT 'Name1',
    "member2Name" TEXT NOT NULL DEFAULT 'Name2',
    "member3Name" TEXT NOT NULL DEFAULT 'Name3',
    "member4Name" TEXT NOT NULL DEFAULT 'Name4',
    "member5Name" TEXT NOT NULL DEFAULT 'Name5',
    "member6Name" TEXT NOT NULL DEFAULT 'Name6',
    "member1Secoonds" INTEGER NOT NULL DEFAULT 0,
    "member2Secoonds" INTEGER NOT NULL DEFAULT 0,
    "member3Secoonds" INTEGER NOT NULL DEFAULT 0,
    "member4Secoonds" INTEGER NOT NULL DEFAULT 0,
    "member5Secoonds" INTEGER NOT NULL DEFAULT 0,
    "member6Secoonds" INTEGER NOT NULL DEFAULT 0,
    "secondsSubscriber" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TimerSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "StreamLabsToken_accessToken_key" ON "StreamLabsToken"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "StreamLabsToken_refreshToken_key" ON "StreamLabsToken"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "StreamLabsToken_socketToken_key" ON "StreamLabsToken"("socketToken");

-- CreateIndex
CREATE UNIQUE INDEX "StreamLabsToken_userId_key" ON "StreamLabsToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TimerSettings_userId_key" ON "TimerSettings"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamLabsToken" ADD CONSTRAINT "StreamLabsToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimerSettings" ADD CONSTRAINT "TimerSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
