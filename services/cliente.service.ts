import { getConnection } from "../controllers/db.controller"
import { CreateClienteRequestBody, UpdateClienteRequestBody } from "../types/cliente";

const getClientes = async () => {
  const connection = getConnection();

  const clientes = await connection
    .select()
    .from('cliente');

  return clientes;
}

const createCliente = async (clienteData: CreateClienteRequestBody) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .insert(clienteData)
      .into('cliente')
      .transacting(trx);

    trx.commit();
  } catch (err) {
    trx.rollback();

    console.error(err);
    throw new Error('Erro ao criar cliente');
  }
}

const updateCliente = async (clienteData: UpdateClienteRequestBody) => {
  const cliId = clienteData.cliId;

  if (cliId == null) {
    throw new Error('cliId precisa ser informado');
  }

  const clienteParsedData = { ...clienteData };
  delete clienteParsedData.cliId;

  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .from('cliente')
      .where({ cliId })
      .update(clienteData)
      .transacting(trx)

    trx.commit()
  } catch (err) {
    console.error(err);
    trx.rollback();

    throw new Error('Erro ao atualizar o cliente');
  }
}

const deleteCliente = async (cliId: number) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .from('cliente')
      .delete()
      .where({ cliId })
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);
    trx.rollback();

    throw new Error('Erro ao remover o cliente');
  }
}

export default { getClientes, createCliente, updateCliente, deleteCliente };
