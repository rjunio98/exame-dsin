import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Altere para a URL do seu backend
});

export const agendarServico = async (cliente, servico, dataAgendamento) => {
  try {
    const response = await api.post("/agendamentos", {
      cliente,
      servico,
      dataAgendamento,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const modificarAgendamento = async (id, dataAgendamento) => {
  try {
    const response = await api.put(`/agendamentos/${id}`, { dataAgendamento });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const obterHistoricoAgendamentos = async (dataInicial, dataFinal) => {
  try {
    const response = await api.get("/agendamentos/historico", {
      params: { dataInicial, dataFinal },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
