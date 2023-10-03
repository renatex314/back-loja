import { getConnection } from "../controllers/db.controller";
import { CreatePedidosRequestBody, Pedido, PedidoByVenIdResponse } from "../types/pedido";
import produtoService from "./produto.service";

const getPedidosByVenId = async (venId: number) => {
  const connection = getConnection();

  try {
    const pedidos: Array<Pedido> = await connection.select().from('venda_items').where({ venId });
    const pedidosResponse: Array<PedidoByVenIdResponse> = [];

    for (let i = 0; i < pedidos.length; i++) {
      const pedido = pedidos[i];

      pedidosResponse.push({
        produto: await produtoService.getProdutoByProdId(pedido.prodId),
        venItQtd: pedido.venItQtd
      });
    }

    return pedidosResponse;
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao obter os pedidos da venda');
  }
}

const createPedidosByVenId = async (createPedidoData: CreatePedidosRequestBody) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection.insert(createPedidoData.pedidos.map((pedido) => ({
      venId: createPedidoData.venId,
      prodId: pedido.prodId,
      venItQtd: pedido.venItQtd
    }))).into('venda_items').transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err)

    trx.rollback();
    throw new Error('Erro ao criar os pedidos');
  }
}

export default {
  getPedidosByVenId,
  createPedidosByVenId
};