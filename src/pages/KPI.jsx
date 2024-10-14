import React, { useState, useEffect } from "react";
import "../styles/Dashboards.css";

function KPI({ indicePeriodo, avancar, voltar }) {
  const periodos = ["24 horas", "48 horas", "1 semana", "1 mes"];

  // Estado das médias
  const [maiorMedia, setMaiorMedia] = useState(0);
  const [menorMedia, setMenorMedia] = useState(0);
  const [totalMedia, setTotalMedia] = useState(0);

  // Estado dos sensores
  const [maiorSensor, setMaiorSensor] = useState("");
  const [menorSensor, setMenorSensor] = useState("");
  const [totalSensor, setTotalSensor] = useState(0);

  useEffect(() => {
    atualizarKPIs(periodos[indicePeriodo]);
  }, [indicePeriodo]);

  async function atualizarKPIs(periodo) {
    try {
      const response = await fetch("/dadosSensores.json");
      const data = await response.json();
  
      console.log("Dados carregados:", data); // Verifique se os dados foram carregados
  
      const periodoData = data.periodos[periodo]; // Corrigido aqui
  
      if (periodoData) {
        // Calcular maior média
        const maiores = periodoData.dadosMaiores;
        const menores = periodoData.dadosMenores;
  
        if (maiores.length > 0) {
          const maior = maiores.reduce((prev, current) => 
            (prev.valor > current.valor) ? prev : current
          );
          setMaiorMedia(maior.valor);
          setMaiorSensor(maior.sensor);
        }
  
        if (menores.length > 0) {
          const menor = menores.reduce((prev, current) => 
            (prev.valor < current.valor) ? prev : current
          );
          setMenorMedia(menor.valor);
          setMenorSensor(menor.sensor);
        }
  
        // Calcular total de sensores
        const totalSensores = maiores.length + menores.length;
        setTotalSensor(totalSensores);
      } else {
        console.warn("Nenhum dado encontrado para o período:", periodo);
      }
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    }
  }
  

  return (
    <div className="KPIS">
      <h2>KPIs</h2>
      <h3 className="navegacao-kpis">
        <span id="voltar" onClick={voltar}> L </span>
        <p>{periodos[indicePeriodo]}</p>
        <span id="avancar" onClick={avancar}> R </span>
      </h3>
      <div className="KPI">
        <h3>MAIOR</h3>
        <span className="indicador">{maiorMedia}</span>
        <p>SENSOR {maiorSensor}</p>
      </div>
      <div className="KPI">
        <h3>MENOR</h3>
        <span className="indicador">{menorMedia}</span>
        <p>SENSOR {menorSensor}</p>
      </div>
      <div className="KPI">
        <h3>TOTAL</h3>
        <span className="indicador">{totalSensor}</span>
        <p>{totalSensor} SENSORES</p>
      </div>
    </div>
  );
}

export default KPI;
