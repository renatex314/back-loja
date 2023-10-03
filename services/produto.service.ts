import { getConnection } from "../controllers/db.controller"
import { Produto, ProdutoResponse } from "../types/produto";
import marcaService from "./marca.service";

const getProdutos = async () => {
  const connection = getConnection();

  try {
    const produtos: Array<Produto> = await connection
      .select()
      .from('produto');

    const produtosResponse: Array<ProdutoResponse> = [];

    for (let i = 0; i < produtos.length; i++) {
      const marcaId = produtos[i]?.marcaId;
      delete produtos[i].marcaId;
      
      const produtoResponse: ProdutoResponse = { ...produtos[i] };
      
      if (Number.isNaN(marcaId) || marcaId == null) {
        produtoResponse.marca = null;
      } else {
        produtoResponse.marca = await marcaService.getMarca(marcaId);
      }

      produtosResponse.push(produtoResponse);
    }

    return produtosResponse;
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao listar os produtos');
  }
}

const getProdutoByProdId = async (prodId: number): Promise<ProdutoResponse> => {
  const connection = getConnection();

  try {
    const produto: Produto = await connection.select().from('produto').where({ prodId }).first();
    const produtoResponse: ProdutoResponse = {
      prodId: prodId,
      prodNome: produto.prodNome,
      prodDescr: produto.prodDescr,
      prodPreco: produto.prodPreco,
      prodQtdEstoque: produto.prodQtdEstoque,
      marca: await marcaService.getMarca(produto.marcaId as number)
    }

    return produtoResponse;
  } catch (err) {
    console.error(err);

    throw new Error('Erro ao obter o produto');
  }
}

const createProduto = async (produtoData: Produto) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    delete produtoData.prodId;

    await connection
      .insert(produtoData)
      .into('produto')
      .transacting(trx);
    
    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao criar o produto');
  }
}

const updateProduto = async (produtoData: Produto) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const prodId = produtoData.prodId;
    delete produtoData.prodId;

    await connection
      .from('produto')
      .update(produtoData)
      .where({ prodId })
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao atualizar o produto');
  }
}

const deleteProduto = async (prodId: number) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .from('produto')
      .delete()
      .where({ prodId })
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao remover o produto');
  }
}

export default {
  getProdutos,
  getProdutoByProdId,
  createProduto,
  updateProduto,
  deleteProduto
}