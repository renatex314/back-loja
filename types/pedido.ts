import { Cliente } from "./cliente";
import { Produto } from "./produto";

export interface Pedido {
  venId: number;
  prodId: number;
  venItQtd: number;
}

export interface PedidoResponse {
  cliente: Cliente;
  produto: Produto;
  venItQtd: number;
}

export interface PedidoByVenIdResponse {
  produto: Produto;
  venItQtd: number;
}

export interface PedidoRequestBodyItem {
  prodId: number;
  venItQtd: number;
}

export type CreatePedidosRequestBody = {venId: number, pedidos: Array<PedidoRequestBodyItem>};

export type GetPedidosListResponse = Array<PedidoResponse>;
export type GetPedidosByVenIdListResponse = Array<PedidoByVenIdResponse>;
