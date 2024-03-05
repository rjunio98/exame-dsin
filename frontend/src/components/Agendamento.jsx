import React, { useState } from "react";
import { agendarServico, obterHistoricoAgendamentos } from "../api/api";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const servicos = [
  { id: 1, nome: "Corte de Cabelo" },
  { id: 2, nome: "Manicure" },
  { id: 3, nome: "Pedicure" },
];

const Agendamento = () => {
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState(new Date());
  const [historico, setHistorico] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoAgendamento = await agendarServico(
        cliente,
        servico,
        dataAgendamento
      );
      console.log("Agendamento realizado:", novoAgendamento);

      setCliente("");
      setServico("");
      setDataAgendamento(new Date());
    } catch (error) {
      console.error("Erro ao agendar serviço:", error.message);
    }
  };

  const handleHistorico = async () => {
    try {
      const historico = await obterHistoricoAgendamentos();
      console.log("Histórico de agendamentos:", historico);
      setHistorico(historico);
    } catch (error) {
      console.error("Erro ao obter histórico de agendamentos:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cliente"
          >
            Cliente
          </label>
          <input
            id="cliente"
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="servico"
          >
            Serviço
          </label>
          <select
            id="servico"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option
                key={servico.id}
                value={servico.id}
              >
                {servico.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dataAgendamento"
          >
            Data do Agendamento
          </label>
          <DatePicker
            id="dataAgendamento"
            selected={dataAgendamento}
            onChange={(date) => setDataAgendamento(date)}
            dateFormat="dd/MM/yyyy"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agendar
        </button>
      </form>

      <button
        onClick={handleHistorico}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Obter Histórico
      </button>

      <ul className="mt-4">
        {historico.map((item) => (
          <div
            key={item.id}
            className="border-b py-2"
          >
            <p>
              <span className="font-bold">Cliente:</span> {item.cliente},
              <span className="font-bold"> Serviço:</span> {item.servico},
              <span className="font-bold"> Data:</span>{" "}
              {new Date(item.data).toLocaleDateString()}
            </p>
            <Link to={`/modificar/${item.id}`}>
              <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded shadow">
                Modificar a data
              </button>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Agendamento;
