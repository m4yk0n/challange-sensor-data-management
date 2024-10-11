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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Função para gerar dados dos sensores
function gerarDadosSensores(periodo) {
  switch (periodo) {
    case "24 horas":
      return {
        labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
        dadosMaiores: [
          { dia: "Segunda", sensor: "Sensor 301", valor: 58 },
          { dia: "Terça", sensor: "Sensor 423", valor: 54 },
          { dia: "Quarta", sensor: "Sensor 444", valor: 52 },
          { dia: "Quinta", sensor: "Sensor 627", valor: 55 },
          { dia: "Sexta", sensor: "Sensor 744", valor: 65 },
          { dia: "Sábado", sensor: "Sensor 501", valor: 72 },
          { dia: "Domingo", sensor: "Sensor 505", valor: 66 },
        ],
        dadosMenores: [
          { dia: "Segunda", sensor: "Sensor 34", valor: 15 },
          { dia: "Terça", sensor: "Sensor 46", valor: 21 },
          { dia: "Quarta", sensor: "Sensor 435", valor: 11 },
          { dia: "Quinta", sensor: "Sensor 644", valor: 4 },
          { dia: "Sexta", sensor: "Sensor 757", valor: 18 },
          { dia: "Sábado", sensor: "Sensor 503", valor: 10 },
          { dia: "Domingo", sensor: "Sensor 505", valor: 12 },
        ],
      };
    case "48 horas":
      return {
        labels: ["Terça", "Quinta", "Sábado", "Domingo", "Segunda", "Quarta", "Sexta"],
        dadosMaiores: [
          // Dados fictícios
          { dia: "Terça", sensor: "Sensor 701", valor: 30 },
          { dia: "Quinta", sensor: "Sensor 802", valor: 45 },
          { dia: "Sábado", sensor: "Sensor 903", valor: 50 },
          { dia: "Domingo", sensor: "Sensor 1004", valor: 60 },
          { dia: "Segunda", sensor: "Sensor 1105", valor: 75 },
          { dia: "Quarta", sensor: "Sensor 1206", valor: 80 },
          { dia: "Sexta", sensor: "Sensor 1307", valor: 90 },
        ],
        dadosMenores: [
          // Dados fictícios
          { dia: "Terça", sensor: "Sensor 34", valor: 10 },
          { dia: "Quinta", sensor: "Sensor 46", valor: 20 },
          { dia: "Sábado", sensor: "Sensor 435", valor: 5 },
          { dia: "Domingo", sensor: "Sensor 644", valor: 8 },
          { dia: "Segunda", sensor: "Sensor 757", valor: 12 },
          { dia: "Quarta", sensor: "Sensor 503", valor: 15 },
          { dia: "Sexta", sensor: "Sensor 505", valor: 18 },
        ],
      };
    case "1 semana":
      return {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7"],
        dadosMaiores: [
          // Dados fictícios
          { dia: "Semana 1", sensor: "Sensor 701", valor: 130 },
          { dia: "Semana 2", sensor: "Sensor 802", valor: 145 },
          { dia: "Semana 3", sensor: "Sensor 903", valor: 150 },
          { dia: "Semana 4", sensor: "Sensor 1004", valor: 160 },
          { dia: "Semana 5", sensor: "Sensor 1105", valor: 175 },
          { dia: "Semana 6", sensor: "Sensor 1206", valor: 180 },
          { dia: "Semana 7", sensor: "Sensor 1307", valor: 190 },
        ],
        dadosMenores: [
          // Dados fictícios
          { dia: "Semana 1", sensor: "Sensor 34", valor: 30 },
          { dia: "Semana 2", sensor: "Sensor 46", valor: 20 },
          { dia: "Semana 3", sensor: "Sensor 435", valor: 25 },
          { dia: "Semana 4", sensor: "Sensor 644", valor: 28 },
          { dia: "Semana 5", sensor: "Sensor 757", valor: 22 },
          { dia: "Semana 6", sensor: "Sensor 503", valor: 15 },
          { dia: "Semana 7", sensor: "Sensor 505", valor: 18 },
        ],
      };
    case "1 mês":
      return {
        labels: ["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5"],
        dadosMaiores: [
          // Dados fictícios
          { dia: "Mês 1", sensor: "Sensor 701", valor: 300 },
          { dia: "Mês 2", sensor: "Sensor 802", valor: 340 },
          { dia: "Mês 3", sensor: "Sensor 903", valor: 360 },
          { dia: "Mês 4", sensor: "Sensor 1004", valor: 380 },
          { dia: "Mês 5", sensor: "Sensor 1105", valor: 400 },
          { dia: "Mês 6", sensor: "Sensor 875", valor: 235 },
          { dia: "Mês 7", sensor: "Sensor 936", valor: 458 },
        ],
        dadosMenores: [
          // Dados fictícios
          { dia: "Mês 1", sensor: "Sensor 34", valor: 150 },
          { dia: "Mês 2", sensor: "Sensor 46", valor: 120 },
          { dia: "Mês 3", sensor: "Sensor 435", valor: 130 },
          { dia: "Mês 4", sensor: "Sensor 644", valor: 140 },
          { dia: "Mês 5", sensor: "Sensor 757", valor: 110 },
          { dia: "Mês 6", sensor: "Sensor 875", valor: 123 },
          { dia: "Mês 7", sensor: "Sensor 936", valor: 178 },
        ],
      };
    default:
      return {
        labels: [],
        dadosMaiores: [],
        dadosMenores: [],
      };
  }
}

function Graficos({ periodo }) {
  const { labels, dadosMaiores, dadosMenores } = gerarDadosSensores(periodo);

  // Dados do gráfico de maiores médias
  const dataMaiores = {
    labels: labels,
    datasets: [
      {
        label: "Maiores Médias",
        data: dadosMaiores.map((d) => d.valor),
        backgroundColor: "rgb(178,34,34)",
      },
    ],
  };

  // Dados do gráfico de menores médias
  const dataMenores = {
    labels: labels,
    datasets: [
      {
        label: "Menores Médias",
        data: dadosMenores.map((d) => d.valor),
        backgroundColor: "rgb(30,144,255)",
      },
    ],
  };

  return (
    <div className="graficos">
      <div className="grafico-maiores">
        <Bar data={dataMaiores} options={{ responsive: true }} />
      </div>
      <div className="grafico-menores">
        <Bar data={dataMenores} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default Graficos;
