import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Papa from "papaparse";
import '../styles/CSV.css'

const INSERIR_DADOS = gql`
  mutation InserirDados($dados: [LeituraSensorInput]!) {
    inserirDados(dados: $dados) {
      sucesso
      mensagem
    }
  }
`;

function CSVUpload() {
  const [file, setFile] = useState(null);
  const [inserirDados] = useMutation(INSERIR_DADOS);
  const fkUsuario = sessionStorage.getItem("idUsuario");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Verifica se o arquivo foi selecionado
    if (!file) {
      console.error("Nenhum arquivo selecionado.");
      alert("Por favor, selecione um arquivo CSV.");
      return; // Retorna para evitar erro
    }

    // Verifique a extensão do arquivo
    const fileExtension = file.name.split(".").pop();
    if (fileExtension !== "csv") {
      console.error("O arquivo selecionado não é um CSV.");
      alert("Por favor, selecione um arquivo CSV válido.");
      return; // Retorna para evitar erro
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const dados = results.data.map((row) => ({
          fkSensor: row.fkSensor,
          dtLeitura: row.dtLeitura,
          media_temperatura: parseFloat(row.media_temperatura),
          fkUsuario: fkUsuario,
        }));

        // Log para verificar os dados antes de enviar
        console.log("Dados a serem enviados para o servidor:", dados);

        // Filtrando dados incompletos
        const dadosValidos = dados.filter(
          (dado) =>
            dado.fkSensor && dado.dtLeitura && !isNaN(dado.media_temperatura)
        );
        console.log("Dados válidos após filtragem:", dadosValidos);

        // Chamada da mutação
        if (dadosValidos.length > 0) {
          inserirDados({ variables: { dados: dadosValidos } })
            .then((response) => {
              console.log("Resposta do servidor:", response);
              alert(response.data.inserirDados.mensagem);
            })
            .catch((error) => {
              console.error("Erro ao enviar dados para o servidor:", error);
              // Log detalhado do erro
              if (error.networkError) {
                console.error("Erro de rede:", error.networkError);
              }
              if (error.graphQLErrors) {
                error.graphQLErrors.forEach((err) => {
                  console.error("Erro GraphQL:", err.message);
                  alert(`Erro: ${err.message}`);
                });
              } else {
                console.error("Erro desconhecido:", error.message); // Log adicional para erros desconhecidos
              }
            });
        } else {
          console.warn("Nenhum dado válido para enviar ao servidor.");
        }
      },
      error: (error) => {
        console.error("Erro ao fazer o parsing do CSV:", error);
      },
    });
  };

  return (
    <div className="tela">
      <div className="container">
        <div className="box">
        <h2>Leitura de sensor por CSV</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default CSVUpload;
