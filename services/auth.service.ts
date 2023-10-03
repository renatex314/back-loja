import { getConnection } from "../controllers/db.controller";
import { Cliente } from "../types/cliente";

const getUserDataByUsuEmail = async (cliEmail: string) => {
  const connection = getConnection();

  const userDataFromDB: Cliente = await connection.select().from('cliente').where({
    cliEmail
  }).first();

  return userDataFromDB;
}

export default {
  getUserDataByUsuEmail
}