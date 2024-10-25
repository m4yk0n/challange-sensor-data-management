import React, { useState } from "react";
import KPI from "./KPI";
import Graficos from "./Graficos";

function Dashboard() {
  const [indicePeriodo, setIndicePeriodo] = useState(0);

  const avancar = () => {
    if (indicePeriodo < 3) setIndicePeriodo(indicePeriodo + 1);
  };

  const voltar = () => {
    if (indicePeriodo > 0) setIndicePeriodo(indicePeriodo - 1);
  };

  return (
    <div className="dashboard">
      <KPI indicePeriodo={indicePeriodo} avancar={avancar} voltar={voltar} />
      <Graficos indicePeriodo={indicePeriodo} />
    </div>
  );
}

export default Dashboard;
