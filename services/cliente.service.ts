import { getConnection } from "../controllers/db.controller";
import {
  CreateClienteRequestBody,
  UpdateClienteRequestBody,
} from "../types/cliente";

const clienteWithEmailExists = async (cliEmail: string) => {
  const connection = getConnection();

  const cliente = await connection
    .select()
    .from("cliente")
    .where({
      cliEmail,
    })
    .first();

  if (!!cliente) return true;

  return false;
};

const clienteWithCpfExists = async (cliCpf: string) => {
  const connection = getConnection();

  const cliente = await connection
    .select()
    .from("cliente")
    .where({
      cliCpf,
    })
    .first();

  if (!!cliente) return true;

  return false;
};

const getClientes = async () => {
  const connection = getConnection();

  const clientes = await connection.select().from("cliente");

  return clientes;
};

const getClienteByCliEmail = async (cliEmail: string) => {
  const connection = getConnection();

  try {
    const cliente = await connection
      .select()
      .from("cliente")
      .where({ cliEmail })
      .first();

    return cliente;
  } catch (err) {
    console.error(err);

    throw new Error("Erro ao obter os dados do cliente");
  }
};

const getClienteByCliId = async (cliId: number) => {
  const connection = getConnection();

  try {
    const cliente = await connection
      .select()
      .from("cliente")
      .where({ cliId })
      .first();

    return cliente;
  } catch (err) {
    console.error(err);

    throw new Error("Erro ao obter os dados do cliente");
  }
};

const createCliente = async (clienteData: CreateClienteRequestBody) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection.insert(clienteData).into("cliente").transacting(trx);

    trx.commit();
  } catch (err) {
    trx.rollback();

    console.error(err);
    throw new Error("Erro ao criar cliente");
  }
};

const updateCliente = async (clienteData: UpdateClienteRequestBody) => {
  const cliId = clienteData.cliId;

  if (cliId == null) {
    throw new Error("cliId precisa ser informado");
  }

  const clienteParsedData = { ...clienteData };
  delete clienteParsedData.cliId;

  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .from("cliente")
      .where({ cliId })
      .update(clienteData)
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);
    trx.rollback();

    throw new Error("Erro ao atualizar o cliente");
  }
};

const deleteCliente = async (cliId: number) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection.from("cliente").delete().where({ cliId }).transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);
    trx.rollback();

    throw new Error("Erro ao remover o cliente");
  }
};

export default {
  clienteWithCpfExists,
  clienteWithEmailExists,
  getClienteByCliId,
  getClienteByCliEmail,
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
};
