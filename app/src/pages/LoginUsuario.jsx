import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import "../styles/Login.css";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $senha: String!) {
    login(email: $email, senha: $senha) {
      success
      message
      usuario {
        idUsuario
        nome
        email
      }
    }
  }
`;

const LoginUsuario = ({ onLogin }) => {
  useEffect(() => {
    document.title = "Gas Utilities Inc. | Login"; // Altera o título da aba

    return () => {
      document.title = "Gas Utilities Inc."; // Opcional: restaura o título ao desmontar
    };
  }, []);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const [login] = useMutation(LOGIN_MUTATION);

  const formularioLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await login({ variables: { email, senha } });
      console.log(data); // Log para verificar o que está sendo retornado

      if (data && data.login) {
        const { success, message, usuario } = data.login;

        if (success) {
          sessionStorage.setItem("idUsuario", usuario.idUsuario);
          sessionStorage.setItem("nomeUsuario", usuario.nome);

          onLogin(data.login); // Chama a função de login passada como prop
        } else {
          setError(message || "Login falhou.");
          console.error(`Erro no login: ${message || "Login falhou."}`);
        }
      } else {
        setError("Resposta inesperada do servidor: login é null.");
        console.error("Resposta inesperada do servidor:", data);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="formulario">
        <form onSubmit={formularioLogin}>
          <span className="saudacoes">
            <h2>Bem vindo(a) de volta!</h2>
          </span>
          <span className="email">
            <p>Insira seu email:</p>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </span>
          <span className="senha">
            <p>Insira sua senha:</p>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              />
          </span>
          <span className="botao-erro">
            <button type="submit">Login</button>
            <a href="#">Esqueceu a Senha?</a>
            {error && <p>{error}</p>}
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginUsuario;
