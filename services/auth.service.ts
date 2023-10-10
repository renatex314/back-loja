import { getConnection } from "../controllers/db.controller";
import { ClientRegisterData } from "../types/auth";
import { Cliente } from "../types/cliente";
import clienteService from "./cliente.service";

const getUserDataByUsuEmail = async (cliEmail: string) => {
  const connection = getConnection();

  const userDataFromDB: Cliente = await connection.select().from('cliente').where({
    cliEmail
  }).first();

  return userDataFromDB;
}

const registerUser = async (registerUserData: ClientRegisterData) => {
  try {
    if (
      await clienteService.clienteWithEmailExists(registerUserData.cliEmail) || 
      await clienteService.clienteWithCpfExists(registerUserData.cliCpf)
    ) throw new Error('Cliente já está cadastrado');

    await clienteService.createCliente(registerUserData);

  } catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }
}

export default {
  getUserDataByUsuEmail,
  registerUser
}