import knex, { Knex } from 'knex';
const knexStringCase = require('knex-stringcase');

let connection: Knex | null = null;

const getConfiguredConnection = () => {
  return knex(knexStringCase({
    client: 'mysql2',
    connection: {
      host: '0.0.0.0',
      port: 3306,
      user: 'aplicacao',
      password: 'Senha123@',
      database: 'loja',
      timezone: 'UTC'
    },
  }))
}

export const getConnection = () => {
  if (connection === null) {
    connection = getConfiguredConnection();
  }

  return connection;
};