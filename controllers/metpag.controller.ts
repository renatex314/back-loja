import { RequestHandler } from "express";
import metpagService from "../services/metpag.service";
import { CreateMetodoPagamentoRequestBody } from "../types/metpag";

const getMetodoPagamentoDropdown: RequestHandler = async (_, res, next) => {
  try {
    const dropdown = await metpagService.getMetodoPagamentoDropdown();

    res.json(dropdown);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

const createMetodoPagamento: RequestHandler = async (req, res, next) => {
  try {
    const metodoPagamentoData: CreateMetodoPagamentoRequestBody = req.body;
    await metpagService.createMetodoPagamento(metodoPagamentoData);

    res.status(200).send('Método de pagamento criado com sucesso');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

const deleteMetodoPagamento: RequestHandler = async (req, res, next) => {
  try {
    const metPagId = parseInt(req.params.metPagId);

    if (Number.isNaN(metPagId)) {
      res.status(400).send('metPagId inválido');
    }

    await metpagService.deleteMetodoPagamento(metPagId);

    res.status(200).send('Método de pagamento removido com sucesso');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

export default { getMetodoPagamentoDropdown, createMetodoPagamento, deleteMetodoPagamento };