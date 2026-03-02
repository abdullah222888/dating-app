-- CreateTable
CREATE TABLE "Unlike" (
    "id" TEXT NOT NULL,
    "unliked_by" TEXT NOT NULL,
    "unliked_to" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unlike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unlike" ADD CONSTRAINT "Unlike_unliked_by_fkey" FOREIGN KEY ("unliked_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unlike" ADD CONSTRAINT "Unlike_unliked_to_fkey" FOREIGN KEY ("unliked_to") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
