import React, { useState, useEffect } from "react";
import MenuLateral from "./MenuLateral";
import Dashboards from "./Dashboards";
import ListaSensores from "./ListaSensores";
import LoginPage from "./LoginUsuario";
import CSVUpload from "./CSVUpload";
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
    // Armazena os dados do usuário no localStorage
    localStorage.setItem("user", JSON.stringify(userData.usuario));
    setLogado(true);
  };

  // Função para encerrar a sessão
  const handleLogout = () => {
    // Limpa os dados da sessão
    sessionStorage.removeItem("idUsuario");
    sessionStorage.removeItem("nomeUsuario");
    localStorage.removeItem("user");
    setLogado(false); // Altera o estado para não logado
    setComponenteAtual("Dashboards"); // Redefine o componente atual se necessário
  };

  // Renderiza o componente com base no estado do componente atual
  const renderizarComponente = () => {
    switch (componenteAtual) {
      case "Dashboards":
        return <Dashboards />;
      case "Sensores":
        return <ListaSensores />;
      case "Configuracoes":
        return <CSVUpload />;
      case "Suporte":
        return <Dashboards />;
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
      <MenuLateral onChangeComponente={setComponenteAtual} onLogout={handleLogout} />
      {renderizarComponente()}
    </div>
  );
}

export default App;
