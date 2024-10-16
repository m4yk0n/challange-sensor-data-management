import React, { useState, useEffect } from "react";
import "../styles/Dashboards.css";

function KPI({ indicePeriodo, avancar, voltar }) {
  const periodos = ["24 horas", "48 horas", "1 semana", "1 mês"];

  // Desabilitar navegação das KPIs
  const maxEsquerda = indicePeriodo === 0;
  const maxDireita = indicePeriodo === periodos.length - 1;

  // Médias de temperatura
  const [maiorMedia, setMaiorMedia] = useState(0);
  const [menorMedia, setMenorMedia] = useState(0);

  // Sensores
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

      console.log("Dados carregados:", data); // Verifica se os dados foram carregados

      const periodoData = data.periodos[periodo];

      if (periodoData) {
        const maiores = periodoData.dadosMaiores;
        const menores = periodoData.dadosMenores;

        if (maiores.length > 0) {
          const maior = maiores.reduce((prev, current) =>
            prev.valor > current.valor ? prev : current
          );
          setMaiorMedia(maior.valor);
          setMaiorSensor(maior.sensor);
        }

        if (menores.length > 0) {
          const menor = menores.reduce((prev, current) =>
            prev.valor < current.valor ? prev : current
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
      <h2 className="nav">Escolha <br /> Um Período</h2>
      <h3 className="navegacao-kpis">
        <span id="voltar"
        onClick={!maxEsquerda ? voltar : null}
        className={maxEsquerda ? "atingido" : ""}
        >
          &#9664;
        </span>
        <p>{periodos[indicePeriodo]}</p>
        <span id="avancar"
        onClick={!maxDireita ? avancar : null}
        className={maxDireita ? "atingido" : ""}
        >
          &#9654;
        </span>
      </h3>
          {/* <h2>KPIs</h2> */}
      <div className="KPI">
        <h3>MAIOR MÉDIA</h3>
        <span className="indicador">{maiorMedia}ºC</span>
        <p>Sensor {maiorSensor}</p>
      </div>
      <div className="KPI">
        <h3>MENOR MÉDIA</h3>
        <span className="indicador">{menorMedia}ºC</span>
        <p>Sensor {menorSensor}</p>
      </div>
      <div className="KPI">
        <h3>TOTAL SENSORES</h3>
        <span className="indicador">{totalSensor}</span>
        <p>OPERANDO</p>
      </div>
    </div>
  );
}

export default KPI;
