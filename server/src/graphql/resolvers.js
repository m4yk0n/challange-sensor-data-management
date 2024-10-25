const db = require("../db");

const resolvers = {
  usuarios: async ({ email, senha }) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );
    return rows;
  },
  sensores: async ({ fkUsuario }) => {
    const [rows] = await db.query(
      "SELECT * FROM sensores WHERE fkUsuario = ?",
      [fkUsuario]
    );
    return rows;
  },
  leituras: async ({ fkSensor }) => {
    const [rows] = await db.query(`
      SELECT idLeitura, fkSensor, DATE_FORMAT(dtLeitura, '%d-%m-%Y %H:%i:%s') AS dtLeitura, media_temperatura
      FROM leituraSensor
      WHERE fkSensor = ?
    `, [fkSensor]);
    return rows;
  },
  adicionarUsuario: async ({ nome, email, senha }) => {
    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    return {
      idUsuario: result.insertId,
      nome,
      email,
      senha,
    };
  },
  login: async ({ email, senha }) => {
    console.log(`Tentativa de login com email: ${email}, senha: ${senha}`);
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length === 0) {
      return {
        success: false,
        message: "Usuário ou senha incorretos.",
        usuario: null,
      };
    }

    const usuario = rows[0];
    return {
      success: true,
      message: "Login realizado com sucesso.",
      usuario,
    };
  },
  leiturasPeriodos: async ({ fkUsuario }) => {
    const now = new Date();
    const umDiaAtras = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const doisDiasAtras = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const seteDiasAtras = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const trintaDiasAtras = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
    const query = `
      SELECT 
        fkSensor,
        FORMAT(AVG(media_temperatura), 2) AS media_temperatura
      FROM 
        leituraSensor 
      WHERE 
        fkUsuario = ? AND dtLeitura >= ?
      GROUP BY 
        fkSensor
      ORDER BY 
        fkSensor;
    `;
  
    const [leituras24Horas] = await db.query(query, [fkUsuario, umDiaAtras]);
    const [leituras48Horas] = await db.query(query, [fkUsuario, doisDiasAtras]);
    const [leituras7Dias] = await db.query(query, [fkUsuario, seteDiasAtras]);
    const [leituras30Dias] = await db.query(query, [fkUsuario, trintaDiasAtras]);
  
    return {
      ultimas24Horas: leituras24Horas,
      ultimas48Horas: leituras48Horas,
      ultimos7Dias: leituras7Dias,
      ultimos30Dias: leituras30Dias,
    };
  }
  
};

module.exports = resolvers;
