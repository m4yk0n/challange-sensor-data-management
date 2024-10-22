const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',         
    user: 'data-management',       
    password: 'R@d1x#2024',     
    database: 'sensordata',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão com o MySQL estabelecida com sucesso!');

  // Testar uma consulta simples
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao realizar a consulta:', err);
      return;
    }
    console.log('Resultados da consulta:', results);
    
    // Encerrar a conexão
    connection.end();
  });
});
