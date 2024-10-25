import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

function Graficos({ periodo }) {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    // Importando o arquivo JSON
    const fetchData = async () => {
      const response = await fetch("/dadosSensores.json");
      const data = await response.json();
      setDados(data.periodos[periodo]);
    };

    fetchData();
  }, [periodo]);

  // Mensagem de carregamento enquanto os dados não estão disponíveis
  if (!dados)
    return (
      <div className="graficos">
        <div className="carregamento">Carregando gráficos...</div>
      </div>
    );

  const { labels, dadosMaiores, dadosMenores } = dados;

  // Configuração dos dados para os gráficos
  const dataMaiores = {
    labels,
    datasets: [
      {
        label: "Maiores Médias",
        data: dadosMaiores.map((d) => d.valor),
        backgroundColor: "#59db79",
        sensors: dadosMaiores.map((d) => d.sensor),
      },
    ],
  };

  const dataMenores = {
    labels,
    datasets: [
      {
        label: "Menores Médias",
        data: dadosMenores.map((d) => d.valor),
        backgroundColor: "#245731",
        sensors: dadosMenores.map((d) => d.sensor),
      },
    ],
  };

  // Opções para o gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Desativa a exibição da legenda
      },
      tooltip: {
        callbacks: {
          // Modifica o tooltip para exibir sensor e valor
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const sensor = dataset.sensors
              ? dataset.sensors[tooltipItem.dataIndex]
              : "Não disponível";
            const valor = dataset.data[tooltipItem.dataIndex];
            return `Sensor: ${sensor} - Temperatura: ${valor}ºC`;
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  
  

  return (
    <div className="graficos">
      <div className="grafico-maiores">
        <h2>Maiores Médias Registradas</h2>
        <Bar data={dataMaiores} options={options} />
      </div>

      <div className="grafico-menores">
        <h2>Menores Médias Registradas</h2>
        <Bar data={dataMenores} options={options} />
      </div>
    </div>
  );
}

export default Graficos;
