import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Importa o modal
import "../styles/Dashboards.css";
import "../styles/Lista.css";

function ListaSensores() {
  useEffect(() => {
    document.title = "GUI | SENSORES"; // Altera o título da aba

    return () => {
      document.title = "Gas Utilities Inc."; // Opcional: restaura o título ao desmontar
    };
  }, []);
  const [sensores, setSensores] = useState([]);
  const [sensorSelecionado, setSensorSelecionado] = useState(null);

  // Função para buscar os dados do JSON
  useEffect(() => {
    fetch("/leituraSensores.json")
      .then((response) => response.json())
      .then((data) => {
        setSensores(data.sensores);
      })
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  }, []);

  // Função para calcular a média das leituras de temperatura
  const calcularMedia = (leituras) => {
    if (!leituras || leituras.length === 0) return 0;
    const total = leituras.reduce((acc, leitura) => acc + leitura.value, 0);
    return (total / leituras.length).toFixed(2);
  };

  // Função para definir o status do sensor
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
              key={sensor.equipmentId}
              onClick={() => setSensorSelecionado(sensor)}
            >
              {sensor.equipmentId}
            </p>
          ))}
        </span>
        <span className="dtHora">
          <h2>MÉDIA DIÁRIA</h2>
          {sensores.map((sensor) => (
            <p className="data" key={sensor.equipmentId + "-media"}>
              {calcularMedia(sensor.leituras)}ºC
            </p>
          ))}
        </span>
        <span className="temp">
          <h2>STATUS</h2>
          {sensores.map((sensor) => {
            const media = calcularMedia(sensor.leituras);
            const status = definirStatus(media);
            return (
              <p className="data" key={sensor.equipmentId + "-status"}>
                {status}
              </p>
            );
          })}
        </span>
      </div>

      {sensorSelecionado && (
        <Modal
          sensor={{
            id: sensorSelecionado.equipmentId,
            mediaTemp: calcularMedia(sensorSelecionado.leituras),
            status: definirStatus(calcularMedia(sensorSelecionado.leituras)),
            leituras: sensorSelecionado.leituras
              ? sensorSelecionado.leituras.map((leitura) => ({
                  data: leitura.timestamp,
                  temp: leitura.value,
                }))
              : [],
          }}
          fecharModal={() => setSensorSelecionado(null)}
        />
      )}
    </div>
  );
}

export default ListaSensores;
