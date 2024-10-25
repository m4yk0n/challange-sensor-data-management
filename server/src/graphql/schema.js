const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Usuario {
    idUsuario: Int
    nome: String
    email: String
  }

  type Sensor {
    equipmentId: String
    fkUsuario: Int
  }

  type LeituraSensor {
    idLeitura: Int
    fkSensor: String
    dtLeitura: String
    media_temperatura: Float
  }
  
  type LeituraPeriodos {
  ultimas24Horas: [LeituraSensor]
  ultimas48Horas: [LeituraSensor]
  ultimos7Dias: [LeituraSensor]
  ultimos30Dias: [LeituraSensor]
  }

  type Query {
    usuarios(email: String, senha: String!): [Usuario]
    sensores(fkUsuario: Int): [Sensor]
    leituras(fkSensor: String): [LeituraSensor]
    leiturasPeriodos(fkUsuario: Int): LeituraPeriodos
    totalSensores(fkUsuario: Int!): Int
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
