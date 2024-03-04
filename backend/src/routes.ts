import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/servicos", async (req: Request, res: Response) => {
  const { nome, preco } = req.body;

  try {
    const novoServico = await prisma.servico.create({
      data: {
        nome,
        preco,
      },
    });

    res.status(201).json({
      message: "Serviço criado com sucesso",
      servico: novoServico,
    });
  } catch (error) {
    return res.status(500).json("Erro ao criar serviço");
  }
});

router.post("/agendamento", async (req: Request, res: Response) => {
  const { cliente, servicoId, dataHora } = req.body;

  try {
    const agendamentoExistente = await prisma.agendamento.findFirst({
      where: {
        dataHora: {
          equals: new Date(dataHora),
        },
        status: {
          not: "cancelado",
        },
      },
    });

    if (agendamentoExistente) {
      return res
        .status(400)
        .json({ message: "Data e horário não estão disponíveis" });
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        cliente,
        servicoId,
        dataHora: new Date(dataHora).toISOString(),
        status: "agendado",
      },
    });

    res.status(201).json({
      message: "Agendamento realizado com sucesso",
      agendamento: novoAgendamento,
    });
  } catch (error) {
    return res.status(500).json("Erro ao criar agendamento");
  }
});

router.put("/agendamento/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cliente, servicoId, dataHora } = req.body;

  try {
    const agendamentoExistente = await prisma.agendamento.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!agendamentoExistente) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    const dataLimite = new Date(agendamentoExistente.dataHora);
    dataLimite.setDate(dataLimite.getDate() - 2);
    if (new Date(dataHora) > dataLimite) {
      return res.status(400).json({
        message:
          "Não é possível modificar o agendamento tão perto da data marcada",
      });
    }

    const agendamentoAtualizado = await prisma.agendamento.update({
      where: {
        id: parseInt(id),
      },
      data: {
        cliente,
        servicoId,
        dataHora: new Date(dataHora).toISOString(),
      },
    });

    res.status(200).json({
      message: "Agendamento atualizado com sucesso",
      agendamento: agendamentoAtualizado,
    });
  } catch (error) {
    return res.status(500).json("Erro ao atualizar agendamento");
  }
});

router.get("/agendamento/historico", async (req: Request, res: Response) => {
  try {
    const agendamentosPassados = (await prisma.agendamento.findMany()).map(
      (agendamento) => ({
        ...agendamento,
        dataHora: new Date(agendamento.dataHora).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          minute: "2-digit",
          hour: "2-digit",
        }),
      })
    );

    res.status(200).json({
      message: "Lista de agendamentos passados",
      agendamentos: agendamentosPassados,
    });
  } catch (error) {
    return res.status(500).json("Erro ao buscar histórico de agendamentos");
  }
});

export default router;
