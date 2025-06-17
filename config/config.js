require('dotenv').config();

function checkEnv(vars) {
  vars.forEach((v) => {
    if (!process.env[v]) {
      throw new Error(`Variável de ambiente necessária ausente: ${v}`);
    }
  });
}

const requiredVars = [
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_HOST',
  'DB_PORT',
  'DB_DIALECT',
];

checkEnv(requiredVars);

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
};