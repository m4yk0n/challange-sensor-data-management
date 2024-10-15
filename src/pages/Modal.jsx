import React from "react";
import "../styles/Modal.css"; 

const Modal = ({ sensor, fecharModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalhes do sensor {sensor.id}</h2>
        <p>Média Temperatura: {sensor.mediaTemp}ºC</p>
        <p>Status: {sensor.status}</p>
        
        <h3>Leituras Detalhadas:</h3>
        <ul>
          {sensor.leituras.map((leitura, index) => {
            const data = new Date(leitura.data);
            const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} (BRA)`;
            
            return (
              <li key={index}>
                {dataFormatada} - {leitura.temp}ºC
              </li>
            );
          })}
        </ul>
        
        <button onClick={fecharModal}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
