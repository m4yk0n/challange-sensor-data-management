import Opcoes from "./Opcoes";
import "../styles/MenuLateral.css";
import React, { useEffect, useState } from "react";

function MenuLateral(props) {
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nome = sessionStorage.getItem("nomeUsuario");
    if (nome) {
      setNomeUsuario(nome);
    } else {
      setNomeUsuario("undefined");
    }
  }, []);

  return (
    <div className="menuLateral">
      <h1>Bem vindo {nomeUsuario}!</h1>
      <Opcoes onChangeComponente={props.onChangeComponente} onLogout={props.onLogout} />
    </div>
  );
}

export default MenuLateral;
