import { getConnection } from "../controllers/db.controller";
import { User } from "../types/auth";

const getUserDataByUsuEmail = async (usuEmail: string) => {
  const connection = getConnection();

  const userDataFromDB: User = await connection.select().from('usuario').where({
    usuEmail
  }).first();

  return userDataFromDB;
}

export default {
  getUserDataByUsuEmail
}