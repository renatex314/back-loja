import { RequestHandler } from "express";
import { getConnection } from "./db.controller";
import { CreateMetodoPagamentoRequestBody, GetMetodoPagamentoDropdownResponse, MetodoPagamento } from "../types/metpag";

const getMetodoPagamentoDropdown: RequestHandler = async (_, res, next) => {
  const connection = getConnection();

  try {
    const metodosPagamento: Array<MetodoPagamento> = await connection
      .select()
      .from('metodo_pagamento');

    const dropdown: GetMetodoPagamentoDropdownResponse = metodosPagamento.map((metodoPagamento) => ({
      value: metodoPagamento?.metPagId,
      label: metodoPagamento?.metPagNome
    }));

    res.json(dropdown);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const createMetodoPagamento: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const metodoPagamentoData: CreateMetodoPagamentoRequestBody = req.body;

    await connection
      .insert(metodoPagamentoData)
      .into('metodo_pagamento')
      .transacting(trx)

    res.status(200).send('Método de pagamento criado com sucesso');
    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const deleteMetodoPagamento: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const metPagId = parseInt(req.params.metPagId);

    if (Number.isNaN(metPagId)) {
      res.status(400).send('metPagId inválido');
    }

    await connection
      .delete()
      .from('metodo_pagamento')
      .where({ metPagId })
      .transacting(trx);

    res.status(200).send('Método de pagamento removido com sucesso');
    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

export default { getMetodoPagamentoDropdown, createMetodoPagamento, deleteMetodoPagamento };