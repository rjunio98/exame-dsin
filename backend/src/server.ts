import express from "express";
import routes from "./routes";

const app = express();
const port = 3000;

// Usa as rotas definidas no arquivo routes.ts
app.use("/", routes);

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
