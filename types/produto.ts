import { Marca } from "./marca";

export interface Produto {
  prodId?: number;
  prodNome?: string;
  prodDescr?: string;
  prodPreco?: number;
  marcaId?: number;
  prodQtdEstoque?: number;
}

export interface ProdutoResponse {
  prodId?: number;
  prodNome?: string;
  prodDescr?: string;
  prodPreco?: number;
  marca?: Marca | null;
  prodQtdEstoque?: number;
}

export type GetProdutoListResponse = Array<ProdutoResponse>;