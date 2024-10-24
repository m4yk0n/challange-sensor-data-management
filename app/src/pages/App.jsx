// import React, { useState } from "react";
// import MenuLateral from "./MenuLateral";
// import Dashboards from "./Dashboards";
// import ListaSensores from "./ListaSensores";
// import "../styles/App.css";
// 
// function App() {
//   const [componenteAtual, setComponenteAtual] = useState("Dashboards");

//   const renderizarComponente = () => {
//     switch (componenteAtual) {
//       case "Dashboards":
//         return <Dashboards />;
//       case "Sensores":
//         return <ListaSensores />;
//       case "Configuracoes":
//         return <Dashboards />; 
//       case "Suporte":
//         return <Dashboards />;
//       default:
//         return <Dashboards />;
//     }
//   };

//   return (
//     <div className="inicio">
//       <MenuLateral onChangeComponente={setComponenteAtual} />
//       {renderizarComponente()}
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import Usuarios from './Usuarios';

// const App = () => {
//   return (
//     <div>
//       <h1>Lista de Usuários</h1>
//       <Usuarios />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import MenuLateral from "./MenuLateral";
import Dashboards from "./Dashboards";
import ListaSensores from "./ListaSensores";
import LoginPage from "./LoginUsuario";
import "../styles/App.css";

function App() {
  const [componenteAtual, setComponenteAtual] = useState("Dashboards");
  const [logado, setLogado] = useState(false);

  // Verifica se o usuário está logado ao carregar a aplicação
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("user");
    if (usuarioLogado) {
      setLogado(true);
    }
  }, []);

  // Função que é chamada ao realizar o login
  const handleLogin = (userData) => {
    // Armazena os dados do usuário, sensores e leituras no localStorage
    localStorage.setItem("user", JSON.stringify(userData.usuario));
    setLogado(true);
  };

  // Renderiza o componente com base no estado do componente atual
  const renderizarComponente = () => {
    switch (componenteAtual) {
      case "Dashboards":
        return <Dashboards />;
      case "Sensores":
        return <ListaSensores />;
      case "Configuracoes":
      case "Suporte":
        return <Dashboards />; // Retornando Dashboards para Configurações e Suporte como exemplo
      default:
        return <Dashboards />;
    }
  };

  // Se o usuário não estiver logado, renderiza a tela de login
  if (!logado) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Se estiver logado, renderiza a interface com MenuLateral e o componente atual
  return (
    <div className="inicio">
      <MenuLateral onChangeComponente={setComponenteAtual} />
      {renderizarComponente()}
    </div>
  );
}

export default App;

