import { Cliente } from "./cliente";
import { MetodoPagamento } from "./metpag";
import { PedidoByVenIdResponse, PedidoRequestBodyItem } from "./pedido";

export interface Venda {
  venId: number;
  venDt: string;
  cliId: number;
  metPagId: number;
}

export interface VendaResponse {
  venId: number;
  venDt: string;
  cliente: Cliente;
  metpag: MetodoPagamento;
}

export interface VendaByCliIdResponse {
  venId: number;
  venDt: string;
  pedidos: Array<PedidoByVenIdResponse>;
  metpag: MetodoPagamento;
}

export type GetVendaListResponse = Array<VendaResponse>;
export type GetVendaListByCliIdResponse = Array<VendaByCliIdResponse>;
export type CreateVendaData = Omit<Venda, 'venDt' | 'venId'>;
export type CreateVendaRequestBody = {
  cliId: number;
  metPagId: number;
  pedidos: Array<PedidoRequestBodyItem>;
}
