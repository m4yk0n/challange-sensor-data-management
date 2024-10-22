const { buildSchema } = require('graphql');

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
    temperatura: Float
  }

  type Query {
    usuarios: [Usuario]
    sensores: [Sensor]
    leituras: [LeituraSensor]
  }
`);

module.exports = schema;
