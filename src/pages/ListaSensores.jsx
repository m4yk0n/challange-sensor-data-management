import { useEffect, useState } from "react";
import "../styles/Dashboards.css";
import "../styles/Lista.css";

function ListaSensores() {
  return (
    <div className="lSensores">
      <div className="lista">
        <span className="equip">
          <h2>NÚMERO DO EQUIPAMENTO</h2>
          <p className="data">
          EQ-12495
          </p>
          <p className="data">
          EQ-12495
          </p>
        </span>
        <span className="dtHora">
          <h2>DATA E HORA DE LEITURA</h2>
          <p className="data">
          2023-02-15T01:30:00.000-05:00
          </p>
          <p className="data">
          2023-02-15T01:30:00.000-05:00
          </p>
        </span>
        <span className="temp">
          <h2>TEMPERATURA</h2>
          <p className="data">
          78.42
          </p>
          <p className="data">
          78.42
          </p>
        </span>
      </div>
    </div>
  );
}

export default ListaSensores;
