import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { modificarAgendamento } from "../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modificar = () => {
  const { id } = useParams();
  const [novaDataAgendamento, setNovaDataAgendamento] = useState(new Date());
  const [modificado, setModificado] = useState(false);
  const [erro, setErro] = useState(null);

  const handleModificacao = async () => {
    try {
      const agendamentoModificado = await modificarAgendamento(
        id,
        novaDataAgendamento
      );
      console.log("Agendamento modificado:", agendamentoModificado);
      setModificado(true);
    } catch (error) {
      console.error("Erro ao modificar agendamento:", error.message);
      setErro(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <DatePicker
        selected={novaDataAgendamento}
        onChange={(date) => setNovaDataAgendamento(date)}
        dateFormat="dd/MM/yyyy"
        className="border rounded p-2 mb-4"
      />
      <button
        onClick={handleModificacao}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
      >
        Modificar Agendamento
      </button>
      {modificado && (
        <p className="text-green-500 font-bold">
          Agendamento modificado com sucesso!
        </p>
      )}
      {erro && (
        <p className="text-red-500 font-bold">
          Erro ao modificar agendamento: {erro}
        </p>
      )}
      <Link to="/agendamento">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Voltar para Agendamento
        </button>
      </Link>
    </div>
  );
};

export default Modificar;
