import { RequestHandler } from "express";
import { getConnection } from "./db.controller";
import { Produto, ProdutoResponse } from "../types/produto";

const getProdutos: RequestHandler = async (_, res, next) => {
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
      produtoResponse.marca = (await connection.select().from('marca').where({ marcaId }))?.[0];

      produtosResponse.push(produtoResponse);
    }

    res.json(produtosResponse);
  } catch (err) {
    console.error(err);

    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const createProduto: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const produtoData: Produto = req.body;

    delete produtoData.prodId;

    await connection
      .insert(produtoData)
      .into('produto')
      .transacting(trx);

    trx.commit();
    res.status(200).send('Produto inserido com sucesso');
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const updateProduto: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const produtoData: Produto = req.body;
    const prodId = produtoData.prodId;

    delete produtoData.prodId;

    await connection
      .from('produto')
      .update(produtoData)
      .where({ prodId })
      .transacting(trx);

    trx.commit();
    res.status(200).send('Produto atulizado com sucesso');
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const deleteProduto: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const prodId = parseInt(req.params.prodId);

    if (Number.isNaN(prodId)) {
      res.status(404).send('prodId inválido');

      trx.rollback();
      return;
    }

    await connection
      .from('produto')
      .delete()
      .where({ prodId })
      .transacting(trx);

    trx.commit();
    res.status(200).send('Produto removido com sucesso');
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

export default { getProdutos, createProduto, updateProduto, deleteProduto };