import { RequestHandler } from "express";
import produtoService from "../services/produto.service";
import { Produto } from "../types/produto";

const getProdutos: RequestHandler = async (_, res, next) => {
  try {
    const produtos = await produtoService.getProdutos();

    res.json(produtos);
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const createProduto: RequestHandler = async (req, res, next) => {
  try {
    const produtoData: Produto = req.body;

    await produtoService.createProduto(produtoData);

    res.status(200).send('Produto inserido com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const updateProduto: RequestHandler = async (req, res, next) => {
  try {
    const produtoData: Produto = req.body;    
    await produtoService.updateProduto(produtoData);

    res.status(200).send('Produto atulizado com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const deleteProduto: RequestHandler = async (req, res, next) => {
  try {
    const prodId = parseInt(req.params.prodId);

    if (Number.isNaN(prodId)) {
      res.status(404).send('prodId inválido');
      return;
    }

    await produtoService.deleteProduto(prodId);

    res.status(200).send('Produto removido com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

export default { getProdutos, createProduto, updateProduto, deleteProduto };