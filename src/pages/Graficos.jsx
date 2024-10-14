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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graficos({ periodo }) {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    // Importando o arquivo JSON corretamente
    const fetchData = async () => {
      const response = await fetch("/dadosSensores.json"); // Ajuste o caminho aqui
      const data = await response.json();
      setDados(data.periodos[periodo]);
    };

    fetchData();
  }, [periodo]);

  // Mensagem de carregamento enquanto os dados não estão disponíveis
  if (!dados) return <div>Carregando gráficos...</div>;

  const { labels, dadosMaiores, dadosMenores } = dados;

  // Configuração dos dados para os gráficos
  const dataMaiores = {
    labels,
    datasets: [
      {
        label: "Maiores Médias",
        data: dadosMaiores.map((d) => d.valor),
        backgroundColor: "rgb(178,34,34)",
      },
    ],
  };

  const dataMenores = {
    labels,
    datasets: [
      {
        label: "Menores Médias",
        data: dadosMenores.map((d) => d.valor),
        backgroundColor: "rgb(30,144,255)",
      },
    ],
  };

  // Opções para o gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Dados de Sensores para o Período de ${periodo}`,
      },
    },
  };

  return (
    <div className="graficos-container">
      <h2>Gráfico de Maiores Dados</h2>
      <Bar data={dataMaiores} options={options} />

      <h2>Gráfico de Menores Dados</h2>
      <Bar data={dataMenores} options={options} />
    </div>
  );
}

export default Graficos;
