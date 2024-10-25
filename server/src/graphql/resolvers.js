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
  
    const fetchLeituras = async (dataLimite) => {
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
  
      const [leituras] = await db.query(query, [fkUsuario, dataLimite]);
      console.log(`Leituras para limite ${dataLimite}:`, leituras);
      return leituras.map(leitura => ({
        idLeitura: null, // Coloque o ID se disponível
        fkSensor: leitura.fkSensor,
        dtLeitura: new Date().toISOString(), // Coloque a data correta
        media_temperatura: parseFloat(leitura.media_temperatura)
      })) || [];  // Garante que seja um array
    };
  
    const leituras24Horas = await fetchLeituras(umDiaAtras);
    const leituras48Horas = await fetchLeituras(doisDiasAtras);
    const leituras7Dias = await fetchLeituras(seteDiasAtras);
    const leituras30Dias = await fetchLeituras(trintaDiasAtras);
  
    return {
      ultimas24Horas: leituras24Horas,
      ultimas48Horas: leituras48Horas,
      ultimos7Dias: leituras7Dias,
      ultimos30Dias: leituras30Dias,
    };
  },
  totalSensores: async ({ fkUsuario }) => {
    const [rows] = await db.query(
      "SELECT COUNT(*) as total FROM sensores WHERE fkUsuario = ?",
      [fkUsuario]
    );
    return rows[0].total;
  },
  // inserirDados: async ({ dados }) => {
  //   console.log("Dados recebidos na mutação:", dados);
  
  //   if (!dados || dados.length === 0) {
  //     console.warn("Nenhum dado recebido para inserção.");
  //     return { sucesso: false, mensagem: "Nenhum dado para inserir." };
  //   }
  
  //   const values = dados.map((dado) => {
  //     return `("${dado.fkSensor}", "${dado.dtLeitura}", ${dado.media_temperatura}, ${dado.fkUsuario})`;
  //   });
  
  //   const query = `
  //     INSERT INTO leituraSensor (fkSensor, dtLeitura, media_temperatura, fkUsuario)
  //     VALUES ${values.join(", ")}
  //   `;
  
  //   try {
  //     await db.query(query); // Aguarda a execução da query
  //     console.log("Dados inseridos com sucesso.");
  //     return { sucesso: true, mensagem: "Dados inseridos com sucesso!" };
  //   } catch (error) {
  //     console.error("Erro ao inserir dados:", error);
  //     return { sucesso: false, mensagem: "Erro ao inserir dados." };
  //   }
  // }  
  // inserirDados: async ({ dados }) => {
  //   console.log("Dados recebidos na mutação:", dados);
  
  //   if (!dados || dados.length === 0) {
  //     console.warn("Nenhum dado recebido para inserção.");
  //     return { sucesso: false, mensagem: "Nenhum dado para inserir." };
  //   }
  
  //   const values = dados.map((dado) => {
  //     if (!dado.fkUsuario) {
  //       console.error("fkUsuario não está definido para o dado:", dado);
  //       return null; 
  //     }
  //     return `("${dado.fkSensor}", "${dado.dtLeitura}", ${dado.media_temperatura}, ${dado.fkUsuario})`;
  //   }).filter(Boolean); 
  
  //   if (values.length === 0) {
  //     return { sucesso: false, mensagem: "Nenhum dado válido para inserir." };
  //   }
  
  //   const query = `
  //     INSERT INTO leituraSensor (fkSensor, dtLeitura, media_temperatura, fkUsuario)
  //     VALUES ${values.join(", ")}
  //   `;
  
  //   try {
  //     await db.query(query);
  //     console.log("Dados inseridos com sucesso.");
  //     return { sucesso: true, mensagem: "Dados inseridos com sucesso!" };
  //   } catch (error) {
  //     console.error("Erro ao inserir dados:", error.message || error);
  //     return { sucesso: false, mensagem: "Erro ao inserir dados." };
  //   }
  // }
  inserirDados: async ({ dados }) => {
    console.log("Dados recebidos na mutação:", JSON.stringify(dados, null, 2)); // Log detalhado
    
    if (!dados || dados.length === 0) {
      console.warn("Nenhum dado recebido para inserção.");
      return { sucesso: false, mensagem: "Nenhum dado para inserir." };
    }
  
    const values = dados.map((dado) => {
      if (!dado.fkUsuario) {
        console.error("fkUsuario não está definido para o dado:", dado);
        return null; // Ignorar se fkUsuario não estiver definido
      }
      return `("${dado.fkSensor}", "${dado.dtLeitura}", ${dado.media_temperatura}, ${dado.fkUsuario})`;
    }).filter(Boolean); // Filtra valores null
  
    if (values.length === 0) {
      return { sucesso: false, mensagem: "Nenhum dado válido para inserir." };
    }
  
    const query = `
      INSERT INTO leituraSensor (fkSensor, dtLeitura, media_temperatura, fkUsuario)
      VALUES ${values.join(", ")}
    `;
  
    try {
      console.log("Executando a query:", query); // Log da query
      await db.query(query);
      console.log("Dados inseridos com sucesso.");
      return { sucesso: true, mensagem: "Dados inseridos com sucesso!" };
    } catch (error) {
      console.error("Erro ao inserir dados:", error.message || error);
      return { sucesso: false, mensagem: "Erro ao inserir dados." };
    }
  }    
};

module.exports = resolvers;
