import React, { useState } from "react";
import MenuLateral from "./MenuLateral";
import Dashboards from "./Dashboards";
import ListaSensores from "./ListaSensores";
import "../styles/App.css";

function App() {
  const [componenteAtual, setComponenteAtual] = useState("Dashboards");

  const renderizarComponente = () => {
    switch (componenteAtual) {
      case "Dashboards":
        return <Dashboards />;
      case "Sensores":
        return <ListaSensores />;
      case "Configuracoes":
        return <Dashboards />; 
      case "Suporte":
        return <Dashboards />;
      default:
        return <Dashboards />;
    }
  };

  return (
    <div className="inicio">
      <MenuLateral onChangeComponente={setComponenteAtual} />
      {renderizarComponente()}
    </div>
  );
}

export default App;
