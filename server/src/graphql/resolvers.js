const db = require('../db'); // Importar a conexão com o banco de dados

const resolvers = {
  usuarios: async () => {
    // Buscar usuários no banco de dados
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
  },
  sensores: async () => {
    // Buscar sensores no banco de dados
    const [rows] = await db.query('SELECT * FROM sensores');
    return rows;
  },
  leituras: async () => {
    // Buscar leituras no banco de dados
    const [rows] = await db.query('SELECT * FROM leituraSensor');
    return rows;
  },
};

module.exports = resolvers;
