import React from "react";
import "../styles/Modal.css"; 

const Modal = ({ sensor, fecharModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="titulo-modal">Detalhes do sensor <b>{sensor.id}</b></h2>
        <p className="indicador-modal">Média Temperatura: {sensor.mediaTemp}ºC</p>
        <p className="indicador-modal">Status: {sensor.status}</p>
        
        <h3 className="subtitulo-modal">Lista de Leituras:</h3>
        <ul className="conjunto-lista">
          {sensor.leituras.map((leitura, index) => {
            const data = new Date(leitura.data);
            const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} (BRA)`;
            
            return (
              <li key={index} className="lista-leituras">
                {dataFormatada} - {leitura.temp}ºC
              </li>
            );
          })}
        </ul>
        
        <button className="botao-modal" onClick={fecharModal}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
