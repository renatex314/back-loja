import { Cliente } from "./cliente";
import { MetodoPagamento } from "./metpag";
import { ProdutoResponse } from "./produto";

export type Pedido = ProdutoResponse & {
  venItQtd: number;
};

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
  pedidos: Array<Pedido>;
  metpag: MetodoPagamento;
}

export type GetVendaListResponse = Array<VendaResponse>;
export type GetVendaListByCliIdResponse = Array<VendaByCliIdResponse>;
