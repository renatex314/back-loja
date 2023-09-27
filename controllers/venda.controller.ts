import { RequestHandler } from "express";
import { getConnection } from "./db.controller";
import { GetVendaListResponse, Venda, VendaResponse } from "../types/venda";

const getVendas: RequestHandler = async (_, res, next) => {
  const connection = getConnection();

  try {
    const vendas: Array<Venda> = await connection
      .select()
      .from('venda');

    const vendasResponse: GetVendaListResponse = [];

    for (let i = 0; i < vendas.length; i++) {
      const vendaResponse: VendaResponse = {
        ...vendas[i],
        cliente: await connection.select().from('cliente').where({ cliId: vendas[i].cliId }).first(),
        metpag: await connection.select().from('metodo_pagamento').where({ metPagId: vendas[i].metPagId }).first()
      };

      vendasResponse.push(vendaResponse);
    }

    res.json(vendasResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const getVendasByCliId: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const cliId = parseInt(req.params.cliId as string);

  if (Number.isNaN(cliId)) {
    return res.status(400).send('cliId inválido');
  }

  try {
    const vendas: Array<Venda> = await connection
      .select()
      .from('venda')
      .where({ cliId });

    const vendasResponse: GetVendaListResponse = [];

    for (let i = 0; i < vendas.length; i++) {
      const vendaResponse: VendaResponse = {
        ...vendas[i],
        cliente: await connection.select().from('cliente').where({ cliId: vendas[i].cliId }).first(),
        metpag: await connection.select().from('metodo_pagamento').where({ metPagId: vendas[i].metPagId }).first()
      };

      vendasResponse.push(vendaResponse);
    }

    res.json(vendasResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

export default { getVendas, getVendasByCliId };
