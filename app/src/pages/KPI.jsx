import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "../styles/Dashboards.css";

const LEITURAS_E_SENSORES = gql`
  query LeiturasPeriodos($fkUsuario: Int!) {
    leiturasPeriodos(fkUsuario: $fkUsuario) {
      ultimas24Horas {
        fkSensor
        media_temperatura
      }
      ultimas48Horas {
        fkSensor
        media_temperatura
      }
      ultimos7Dias {
        fkSensor
        media_temperatura
      }
      ultimos30Dias {
        fkSensor
        media_temperatura
      }
    }
    totalSensores(fkUsuario: $fkUsuario)
  }
`;

function KPI({ indicePeriodo, avancar, voltar }) {
  const fkUsuario = parseInt(sessionStorage.getItem("idUsuario"), 10);
  const { loading, error, data } = useQuery(LEITURAS_E_SENSORES, {
    variables: { fkUsuario },
  });

  const periodos = ["ultimas24Horas", "ultimas48Horas", "ultimos7Dias", "ultimos30Dias"];
  const periodoAtual = periodos[indicePeriodo];
  const periodosFormatados = ["24 Horas", "48 Horas", "7 Dias", "30 Dias"]

  const [maiorMedia, setMaiorMedia] = useState(0);
  const [menorMedia, setMenorMedia] = useState(0);
  const [maiorSensor, setMaiorSensor] = useState("");
  const [menorSensor, setMenorSensor] = useState("");
  const [totalSensor, setTotalSensor] = useState(0);

  useEffect(() => {
    if (data) {
      const leituras = data.leiturasPeriodos[periodoAtual];
      const total = data.totalSensores;

      if (leituras && leituras.length > 0) {
        const maior = leituras.reduce((prev, curr) => (prev.media_temperatura > curr.media_temperatura ? prev : curr));
        const menor = leituras.reduce((prev, curr) => (prev.media_temperatura < curr.media_temperatura ? prev : curr));

        setMaiorMedia(maior.media_temperatura);
        setMaiorSensor(maior.fkSensor);
        setMenorMedia(menor.media_temperatura);
        setMenorSensor(menor.fkSensor);
        setTotalSensor(total);
      }
    }
  }, [data, periodoAtual]);

  if (loading) return <div>Carregando KPIs...</div>;
  if (error) return <div>Erro ao carregar KPIs: {error.message}</div>;

  return (
    <div className="KPIS">
      <h2 className="nav">Escolha <br /> Um Período</h2>
      <h3 className="navegacao-kpis">
        <span
          id="voltar"
          onClick={indicePeriodo > 0 ? voltar : null}
          className={indicePeriodo === 0 ? "atingido" : ""}
        >
          &#9664;
        </span>
        <p>{periodosFormatados[indicePeriodo].replace("ultimas", "")}</p>
        <span
          id="avancar"
          onClick={indicePeriodo < periodos.length - 1 ? avancar : null}
          className={indicePeriodo === periodos.length - 1 ? "atingido" : ""}
        >
          &#9654;
        </span>
      </h3>
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
