import React from "react";
import "../styles/Modal.css";
import { useQuery, gql } from "@apollo/client";

const LISTAR_LEITURAS_SENSOR = gql`
  query LeiturasSensor($fkSensor: String!) {
    leituras(fkSensor: $fkSensor) {
      idLeitura
      dtLeitura
      media_temperatura
    }
  }
`;

const Modal = ({ sensor, fecharModal }) => {
  console.log("Sensor recebido no Modal:", sensor);

  const { loading, error, data } = useQuery(LISTAR_LEITURAS_SENSOR, {
    variables: { fkSensor: sensor.idSensor },
    skip: !sensor.idSensor,
  });

  if (loading) return <p>Carregando leituras...</p>;
  if (error) return <p>Erro ao carregar leituras: {error.message}</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="titulo-modal">
          Detalhes do sensor <b>{sensor.idSensor}</b>
        </h2>
        <p className="indicador-modal">
          Média Temperatura: {sensor.mediaTemp}ºC
        </p>
        <p className="indicador-modal">Status: {sensor.status}</p>

        <h3 className="subtitulo-modal">Lista de Leituras:</h3>
        {data && data.leituras && data.leituras.length > 0 ? (
          <ul className="conjunto-lista">
            {data.leituras.map((leitura) => {
              return (
                <li key={leitura.idLeitura} className="lista-leituras">
                  {leitura.dtLeitura} - {leitura.media_temperatura}ºC
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Nenhuma leitura disponível para este sensor.</p>
        )}

        <button className="botao-modal" onClick={fecharModal}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
