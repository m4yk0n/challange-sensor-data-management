import "../styles/MenuLateral.css";

function Opcoes() {
  return (
    <div className="opcoes">
      <ul>
        <li>
          <a className="opcao" href="#">
            Dashboard Principal
          </a>
        </li>
        <li id="dash">
          <a className="opcao" href="#">
            Dashboard filtrada
          </a>
        </li>
        <li>
          <a className="opcao" href="#">
            Configurações
          </a>
        </li>
        <li>
          <a className="opcao" href="#">
            Suporte
          </a>
        </li>
        <li className="sair">
          <a className="opcao" href="#">
            Encerrar Sessão
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Opcoes;
