const db = require('../db');

const resolvers = {
    usuarios: async ({ email, senha }) => {
      const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);
      return rows;
    },
    sensores: async () => {
      const [rows] = await db.query('SELECT * FROM sensores');
      return rows;
    },
    leituras: async () => {
      const [rows] = await db.query('SELECT * FROM leituraSensor');
      return rows;
    },
    adicionarUsuario: async ({ nome, email, senha }) => {
      const [result] = await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
      return {
        idUsuario: result.insertId,
        nome,
        email,
        senha
      };
    },
    login: async ({ email, senha }) => {
      console.log(`Tentativa de login com email: ${email}, senha: ${senha}`);
      const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

      if (rows.length === 0) {
        return {
          success: false,
          message: 'Usuário ou senha incorretos.',
          usuario: null
        };
      }

      const usuario = rows[0];
      return {
        success: true,
        message: 'Login realizado com sucesso.',
        usuario
      };
    }
};

module.exports = resolvers;
