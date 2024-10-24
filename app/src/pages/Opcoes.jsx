import React from "react";
import "../styles/MenuLateral.css";
import { useNavigate } from "react-router-dom";

function Opcoes({ onChangeComponente, onLogout }) { // Adiciona a função como prop

  const navigate = useNavigate();
  const encerrarSessao = () => {
    // Chama a função de logout
    onLogout();
    // Redireciona para a tela de login
    navigate("/LoginUsuario");
  };

  return (
    <div className="opcoes">
      <ul>
        <li>
          <a className="opcao" href="#" onClick={() => onChangeComponente("Dashboards")}>
            Dashboard
          </a>
        </li>
        <li id="dash">
          <a className="opcao" href="#" onClick={() => onChangeComponente("Sensores")}>
            Sensores
          </a>
        </li>
        <li>
          <a className="opcao" href="#" onClick={() => onChangeComponente("Configuracoes")}>
            Configurações
          </a>
        </li>
        <li>
          <a className="opcao" href="#" onClick={() => onChangeComponente("Suporte")}>
            Suporte
          </a>
        </li>
        <li className="sair">
          <a className="opcao" href="#" onClick={encerrarSessao}>
            Encerrar Sessão
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Opcoes;
