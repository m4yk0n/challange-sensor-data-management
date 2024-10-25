import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery, gql } from "@apollo/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Dashboards.css";

// Registra os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define a consulta GraphQL
const LISTAR_LEITURAS = gql`
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
  }
`;

function Graficos({ indicePeriodo }) {
  const fkUsuario = parseInt(sessionStorage.getItem("idUsuario"), 10);
  const { loading, error, data } = useQuery(LISTAR_LEITURAS, {
    variables: { fkUsuario },
  });

  const periodos = ["ultimas24Horas", "ultimas48Horas", "ultimos7Dias", "ultimos30Dias"];
  const periodoAtual = periodos[indicePeriodo];
  const periodosFormatados = ["24 Horas", "48 Horas", "7 Dias", "30 Dias"]

  if (loading)
    return (
      <div className="graficos">
        <div className="carregamento">Carregando gráficos...</div>
      </div>
    );
  if (error)
    return (
      <div className="graficos">
        <div className="carregamento">
          Erro ao buscar leituras: {error.message}
        </div>
      </div>
    );

  const leituras = data.leiturasPeriodos[periodoAtual] || [];

  // Filtra as leituras em maiores e menores médias
  const maioresLeituras = leituras.filter(leitura => leitura.media_temperatura > 70);
  const menoresLeituras = leituras.filter(leitura => leitura.media_temperatura <= 70);

  // Função para criar o data set para os gráficos
  const criarDataSet = (leituras, tipo) => {
    const sortedLeituras = leituras.sort((a, b) => a.media_temperatura - b.media_temperatura); // Ordena do menor para o maior
    const labels = sortedLeituras.map((sensor) => sensor.fkSensor);
    const dados = sortedLeituras.map((sensor) => sensor.media_temperatura);

    return {
      labels,
      datasets: [
        {
          label: tipo === 'maiores' ? "Maiores Médias (Acima de 70°C)" : "Menores Médias (70°C ou Abaixo)",
          data: dados,
          backgroundColor: tipo === 'maiores' ? "#59db79" : "#245731",
        },
      ],
    };
  };

  const dataMaiores = criarDataSet(maioresLeituras, 'maiores');
  const dataMenores = criarDataSet(menoresLeituras, 'menores');

  // Opções para o gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const valor = dataset.data[tooltipItem.dataIndex];
            return `Média de Temperatura: ${valor}ºC`;
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        title: {
          display: true,
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="graficos">
      <div className="grafico-maiores">
        <h2>Maiores Médias - {periodosFormatados[indicePeriodo].replace("ultimas", "").replace("Dias", " Dias")}</h2>
        {maioresLeituras.length > 0 ? (
          <Bar data={dataMaiores} options={options} />
        ) : (
          <div>Nenhuma média acima de 70°C</div>
        )}
      </div>
      <div className="grafico-menores">
        <h2>Menores Médias - {periodosFormatados[indicePeriodo].replace("ultimas", "").replace("Dias", " Dias")}</h2>
        {menoresLeituras.length > 0 ? (
          <Bar data={dataMenores} options={options} />
        ) : (
          <div>Nenhuma média de 70°C ou abaixo</div>
        )}
      </div>
    </div>
  );
}

export default Graficos;
