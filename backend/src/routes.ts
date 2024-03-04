const express = require("express");
import { Router, Request, Response } from "express";
const router = Router();

// Define a rota para a página inicial
router.get("/", (req: Request, res: Response) => {
  res.send("Olá, mundo!");
});

// Define outras rotas
router.get("/sobre", (req: Request, res: Response) => {
  res.send("Página Sobre");
});

export default router;
