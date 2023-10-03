import { RequestHandler } from "express";
import { CreateClienteRequestBody, UpdateClienteRequestBody } from "../types/cliente";
import clienteService from "../services/cliente.service";

const getClientes: RequestHandler = async (_, res, next) => {
  try {
    const clientes = await clienteService.getClientes();
    res.json(clientes);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

const createCliente: RequestHandler = async (req, res, next) => {
  try {
    const clienteData: CreateClienteRequestBody = req.body;

    await clienteService.createCliente(clienteData);

    res.status(200).send('Cliente criado com sucesso');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

const updateCliente: RequestHandler = async (req, res, next) => {

  try {
    const clienteData: UpdateClienteRequestBody = req.body;
    await clienteService.updateCliente(clienteData);

    res.status(200).send('Cliente atualizado com sucesso');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

const deleteCliente: RequestHandler = async (req, res, next) => {
  try {
    const cliId = parseInt(req.params.cliId);

    if (Number.isNaN(cliId)) {
      return res.status(400).send('cliId inválido');
    }

    await clienteService.deleteCliente(cliId);

    res.status(200).send('Cliente removido com sucesso');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
    next();
  }
}

export default { createCliente, getClientes, updateCliente, deleteCliente };