import React from "react";
import "../styles/MenuLateral.css";

function Opcoes({ onChangeComponente }) { // Adiciona a função como prop
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
          <a className="opcao" href="#" onClick={() => onChangeComponente("Encerrar")}>
            Encerrar Sessão
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Opcoes;
