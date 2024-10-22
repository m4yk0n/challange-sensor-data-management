const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',         
  user: 'data-management',       
  password: 'R@d1x#2024',     
  database: 'sensordata',    
});

module.exports = pool;
