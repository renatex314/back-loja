import { getConnection } from "../controllers/db.controller"
import { CreateMetodoPagamentoRequestBody, GetMetodoPagamentoDropdownResponse, MetodoPagamento } from "../types/metpag";

const getMetodoPagamentoDropdown = async () => {
  const connection = getConnection();

  try {
    const metodosPagamento: Array<MetodoPagamento> = await connection
      .select()
      .from('metodo_pagamento');

    const dropdown: GetMetodoPagamentoDropdownResponse = metodosPagamento.map((metodoPagamento) => ({
      value: metodoPagamento?.metPagId,
      label: metodoPagamento?.metPagNome
    }));

    return dropdown;
  } catch (err) {
    console.error(err);

    throw new Error('Erro ao listar o dropdown de método de pagamentos');
  }
}

const getMetodoPagamento = async (metPagId: number) => {
  const connection = getConnection();

  try {
    const metodoPagamento = await connection.select().from('metodo_pagamento').where({ metPagId }).first();

    return metodoPagamento;
  } catch (err) {
    console.error(err);

    throw new Error('Erro ao obter o método de pagamento');
  }
}

const createMetodoPagamento = async (metodoPagamentoData: CreateMetodoPagamentoRequestBody) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .insert(metodoPagamentoData)
      .into('metodo_pagamento')
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao criar o método de pagamento');
  }
}

const deleteMetodoPagamento = async (metPagId: number) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .delete()
      .from('metodo_pagamento')
      .where({ metPagId })
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao remover o método de pagamento');
  }
}

export default {
  getMetodoPagamentoDropdown,
  getMetodoPagamento,
  createMetodoPagamento,
  deleteMetodoPagamento
}