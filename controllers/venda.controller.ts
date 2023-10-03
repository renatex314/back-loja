import { RequestHandler } from "express";
import vendaService from "../services/venda.service";
import { CreateVendaData, CreateVendaRequestBody } from "../types/venda";
import pedidoService from "../services/pedido.service";

const getVendas: RequestHandler = async (_, res, next) => {
  try {
    const vendas = await vendaService.getVendas();

    res.json(vendas);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

const createVenda: RequestHandler = async (req, res, next) => {
  try {
    const createVendaData: CreateVendaRequestBody = req.body;

    const venId: number = await vendaService.createVenda({
      cliId: createVendaData.cliId,
      metPagId: createVendaData.metPagId
    });

    await pedidoService.createPedidosByVenId({
      venId,
      pedidos: createVendaData.pedidos
    });

    res.status(200).send('Venda criada com sucesso');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
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
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

export default { createVenda, getVendas, getVendasByCliId };
