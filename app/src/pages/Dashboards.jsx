import "../styles/Dashboards.css";
import KPI from "./KPI";
import Graficos from "./Graficos";
import { useState, useEffect } from "react";

function Dashboards() {
  useEffect(() => {
    document.title = "GUI | DASHBOARD"; // Altera o título da aba

    return () => {
      document.title = "Gas Utilities Inc."; // Opcional: restaura o título ao desmontar
    };
  }, []);

  const periodos = ["24 horas", "48 horas", "1 semana", "1 mês"];
  const [indicePeriodo, setIndicePeriodo] = useState(0);

  function avancar() {
    if (indicePeriodo < periodos.length - 1) {
      setIndicePeriodo(indicePeriodo + 1);
    }
  }

  function voltar() {
    if (indicePeriodo > 0) {
      setIndicePeriodo(indicePeriodo - 1);
    }
  }

  return (
    <div className="dashboard">
      <KPI indicePeriodo={indicePeriodo} avancar={avancar} voltar={voltar} />
      <Graficos periodo={periodos[indicePeriodo]} />
    </div>
  );
}

export default Dashboards;
