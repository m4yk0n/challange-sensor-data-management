import Opcoes from "./Opcoes";
import './MenuLateral.css';

function MenuLateral(props) {

    const usuario = props.nome ? props.nome : "undefined";

    return (
        <div className="menuLateral">
            <img src={props.imagemUsuario}/>
            <h1>Olá, {usuario}!</h1>
            <Opcoes />
        </div>
    )

}

export default (
    MenuLateral
)