import { getConnection } from "../controllers/db.controller"
import { CreateVendaData, CreateVendaRequestBody, GetVendaListByCliIdResponse, GetVendaListResponse, Venda, VendaByCliIdResponse, VendaResponse } from "../types/venda";
import { formatDate } from "../utils";
import clienteService from "./cliente.service";
import metpagService from "./metpag.service";
import pedidoService from "./pedido.service";

const getVendasByCliId = async (cliId?: number) => {
  const connection = getConnection();

  try {
    const vendas: Array<Venda> = await connection
    .select()
    .from('venda')
    .where(cliId ? { cliId } : {});

    const vendasResponse: GetVendaListByCliIdResponse = [];

    for (let i = 0; i < vendas.length; i++) {
      const vendaResponse: VendaByCliIdResponse = {
        ...vendas[i],
        pedidos: await pedidoService.getPedidosByVenId(vendas[i].venId),
        metpag: await metpagService.getMetodoPagamento(vendas[i].metPagId)
      };

      vendasResponse.push(vendaResponse);
    }

    return vendasResponse;
  } catch (err) {
    console.error(err);

    throw new Error('Erro ao obter as vendas do cliente');
  }
}

const getVendas = async () => {
  const connection = getConnection();

  try {
    const vendas: Array<Venda> = await connection
    .select()
    .from('venda');

    const vendasResponse: GetVendaListResponse = [];

    for (let i = 0; i < vendas.length; i++) {
      const vendaResponse: VendaResponse = {
        ...vendas[i],
        cliente: await clienteService.getClienteByCliId(vendas[i].cliId),
        metpag: await metpagService.getMetodoPagamento(vendas[i].metPagId)
      };

      vendasResponse.push(vendaResponse);
    }

    return vendasResponse;
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao obter a lista de vendas');
  }
}

const createVenda = async (vendaData: CreateVendaData) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const venDt = formatDate(new Date());
    const venId: number = await connection.insert({
      venDt,
      cliId: vendaData.cliId,
      metPagId: vendaData.metPagId
    }, 'ven_id')
    .into('venda');

    trx.commit();

    return venId;
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao criar a venda');
  }
}

export default {
  getVendas,
  getVendasByCliId,
  createVenda
}