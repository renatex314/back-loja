import { RequestHandler } from "express";
import { getConnection } from "./db.controller";
import { CreateClienteRequestBody, UpdateClienteRequestBody } from "../types/cliente";
import clienteService from "../services/cliente.service";

const getClientes: RequestHandler = async (_, res, next) => {
  try {
    const clientes = await clienteService.getClientes();
    res.json(clientes);
  } catch (err) {
    console.error(err);
    next();
  }
}

const createCliente: RequestHandler = async (req, res, next) => {
  try {
    const clienteData: CreateClienteRequestBody = req.body;

    clienteService.createCliente(clienteData);

    res.status(200).send('Cliente criado com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const updateCliente: RequestHandler = async (req, res, next) => {

  try {
    const clienteData: UpdateClienteRequestBody = req.body;
    clienteService.updateCliente(clienteData);

    res.status(200).send('Cliente atualizado com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const deleteCliente: RequestHandler = async (req, res, next) => {
  try {
    const cliId = parseInt(req.params.cliId);

    if (Number.isNaN(cliId)) {
      return res.status(400).send('cliId inválido');
    }

    clienteService.deleteCliente(cliId);

    res.status(200).send('Cliente removido com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

export default { createCliente, getClientes, updateCliente, deleteCliente };