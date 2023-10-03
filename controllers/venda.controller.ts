import { RequestHandler } from "express";
import vendaService from "../services/venda.service";

const getVendas: RequestHandler = async (_, res, next) => {
  try {
    const vendas = await vendaService.getVendas();

    res.json(vendas);
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const getVendasByCliId: RequestHandler = async (req, res, next) => {
  const cliId = parseInt(req.params.cliId as string);

  if (Number.isNaN(cliId)) {
    return res.status(400).send('cliId inválido');
  }

  try {
    const vendasResponse = await vendaService.getVendasByCliId(cliId);

    res.json(vendasResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

export default { getVendas, getVendasByCliId };
