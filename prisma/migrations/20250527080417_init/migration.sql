-- CreateTable
CREATE TABLE "Sprint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "completionRate" DOUBLE PRECISION NOT NULL,
    "ticketCount" INTEGER NOT NULL,
    "stagnantCount" INTEGER NOT NULL,
    "unassignedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsigneeState" (
    "id" SERIAL NOT NULL,
    "sprintId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "done" INTEGER NOT NULL,
    "inProgress" INTEGER NOT NULL,
    "toDo" INTEGER NOT NULL,

    CONSTRAINT "AsigneeState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AsigneeState" ADD CONSTRAINT "AsigneeState_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
