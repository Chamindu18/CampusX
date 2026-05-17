-- CreateTable
CREATE TABLE "Dorm" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "facilities" TEXT[],
    "imageUrls" TEXT[],
    "contactNumber" TEXT NOT NULL,
    "distanceFromUniversity" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dorm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dorm_userId_idx" ON "Dorm"("userId");

-- CreateIndex
CREATE INDEX "Dorm_university_idx" ON "Dorm"("university");

-- CreateIndex
CREATE INDEX "Dorm_city_idx" ON "Dorm"("city");

-- CreateIndex
CREATE INDEX "Dorm_gender_idx" ON "Dorm"("gender");

-- CreateIndex
CREATE INDEX "Dorm_createdAt_idx" ON "Dorm"("createdAt");

-- AddForeignKey
ALTER TABLE "Dorm" ADD CONSTRAINT "Dorm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
