const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema'); 
const resolvers = require('./src/graphql/resolvers'); 
const cors = require('cors');

const app = express();
app.use(cors()); 

// Configurando a rota /graphql
app.use('/graphql', graphqlHTTP({
  schema, 
  rootValue: resolvers,
  graphiql: true, // Habilita a interface do GraphiQL para testes
}));

const PORT = process.env.PORT || 4000; 

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT}/graphql para o GraphiQL`);
});
