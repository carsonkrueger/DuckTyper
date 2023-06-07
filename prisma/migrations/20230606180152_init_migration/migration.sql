-- CreateTable
CREATE TABLE "record" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(12) NOT NULL,
    "timer" SMALLINT NOT NULL,
    "difficulty" SMALLINT NOT NULL,
    "wpm" SMALLINT NOT NULL,

    CONSTRAINT "record_pkey" PRIMARY KEY ("id")
);
