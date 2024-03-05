-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "servico" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);
