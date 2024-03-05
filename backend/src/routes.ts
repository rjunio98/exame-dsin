import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

router.post("/agendamentos", async (req: Request, res: Response) => {
  try {
    const { cliente, servico, dataAgendamento } = req.body;

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        cliente,
        servico,
        data: new Date(dataAgendamento),
      },
    });

    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível agendar o serviço." });
  }
});

router.put("/agendamentos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { dataAgendamento } = req.body;

  try {
    const agendamento = await prisma.agendamento.findUnique({
      where: { id: id },
    });

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado." });
    }

    const hoje = new Date();
    const dataLimite = new Date(agendamento.data);
    dataLimite.setDate(dataLimite.getDate() - 2);

    if (hoje.getTime() > dataLimite.getTime()) {
      return res.status(400).json({
        error:
          "Não é possível modificar o agendamento com menos de 2 dias de antecedência.",
      });
    }

    const agendamentoAtualizado = await prisma.agendamento.update({
      where: { id: id },
      data: { data: new Date(dataAgendamento) },
    });

    res.json(agendamentoAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível modificar o agendamento." });
  }
});

router.get("/agendamentos/historico", async (req, res) => {
  const { dataInicial, dataFinal } = req.query;

  if (typeof dataInicial !== "string" || typeof dataFinal !== "string") {
    return res
      .status(400)
      .json({ error: "Data inicial e final devem ser strings." });
  }

  try {
    let historico = await prisma.agendamento.findMany({
      where: {
        data: {
          gte: new Date(dataInicial),
          lte: new Date(dataFinal),
        },
      },
    });

    res.json(historico);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível obter o histórico de agendamentos." });
  }
});

export default router;
