const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Usuario {
    idUsuario: Int
    nome: String
    email: String
    senha: String
  }

  type Sensor {
    equipmentId: String
    fkUsuario: Int
  }

  type LeituraSensor {
    idLeitura: Int
    fkSensor: String
    dtLeitura: String
    temperatura: Float
  }

  type Query {
    usuarios(email: String, senha: String!): [Usuario]
    sensores: [Sensor]
    leituras: [LeituraSensor]
  }
  
  type Mutation {
  adicionarUsuario(nome: String!, email: String!, senha: String!): Usuario
  login(email: String!, senha: String!): LoginResponse
  }
  
  type LoginResponse {
    success: Boolean
    message: String
    usuario: Usuario
  }

`);

module.exports = schema;
