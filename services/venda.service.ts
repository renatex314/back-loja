import { getConnection } from "../controllers/db.controller"
import { GetVendaListResponse, Venda, VendaResponse } from "../types/venda";
import clienteService from "./cliente.service";
import metpagService from "./metpag.service";

const getVendasByCliId = async (cliId?: number) => {
  const connection = getConnection();

  try {
    const vendas: Array<Venda> = await connection
    .select()
    .from('venda')
    .where(cliId ? { cliId } : {});

    const vendasResponse: GetVendaListResponse = [];

    for (let i = 0; i < vendas.length; i++) {
      const vendaResponse: VendaResponse = {
        ...vendas[i],
        cliente: await clienteService.getCliente(vendas[i].cliId),
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
  try {
    return getVendasByCliId();
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao obter a lista de vendas');
  }
}

export default {
  getVendas,
  getVendasByCliId
}