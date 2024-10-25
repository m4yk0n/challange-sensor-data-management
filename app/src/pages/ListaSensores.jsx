import React, { useState, useEffect } from "react";
import Modal from "./Modal"; 
import "../styles/Dashboards.css";
import "../styles/Lista.css";
import { useQuery, gql } from "@apollo/client";

const LISTAR_SENSORES = gql`
  query LeiturasPeriodos($fkUsuario: Int!) {
    leiturasPeriodos(fkUsuario: $fkUsuario) {
      ultimas24Horas {
        fkSensor
        media_temperatura
      }
    }
  }
`;

function ListaSensores() {
  const fkUsuario = parseInt(sessionStorage.getItem("idUsuario"), 10);
  const [sensorSelecionado, setSensorSelecionado] = useState(null);
  
  const { loading, error, data } = useQuery(LISTAR_SENSORES, {
    variables: { fkUsuario },
  });

  useEffect(() => {
    document.title = "GUI | SENSORES"; 
    return () => {
      document.title = "Gas Utilities Inc.";
    };
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar sensores: {error.message}</p>;

  const sensores = data.leiturasPeriodos.ultimas24Horas;

  const definirStatus = (media) => {
    if (media > 80) return "Alto";
    if (media < 60) return "Baixo";
    return "Bom";
  };

  return (
    <div className="lSensores">
      <div className="lista">
        <span className="equip">
          <h2>NÚMERO DO EQUIPAMENTO</h2>
          {sensores.map((sensor) => (
            <p
              className="data"
              key={sensor.fkSensor}
              onClick={() => setSensorSelecionado(sensor)}
            >
              {sensor.fkSensor}
            </p>
          ))}
        </span>
        <span className="dtHora">
          <h2>MÉDIA DIÁRIA</h2>
          {sensores.map((sensor) => (
            <p className="data" key={sensor.fkSensor + "-media"}>
              {sensor.media_temperatura}ºC
            </p>
          ))}
        </span>
        <span className="temp">
          <h2>STATUS</h2>
          {sensores.map((sensor) => {
            const status = definirStatus(sensor.media_temperatura);
            return (
              <p className="data" key={sensor.fkSensor + "-status"}>
                {status}
              </p>
            );
          })}
        </span>
      </div>

      {sensorSelecionado && (
        <Modal
          sensor={{
            idSensor: sensorSelecionado.fkSensor,
            mediaTemp: sensorSelecionado.media_temperatura,
            status: definirStatus(sensorSelecionado.media_temperatura),
          }}
          fecharModal={() => setSensorSelecionado(null)}
        />
      )}
    </div>
  );
}

export default ListaSensores;
