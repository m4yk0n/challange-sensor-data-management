import MenuLateral from "./MenuLateral";
import Dashboards from "./Dashboards";
import ListaSensores from "./ListaSensores";
import "../styles/App.css";

function App() {
  return (
    <div className="inicio">
      <MenuLateral />
      <Dashboards />
      {/* <ListaSensores /> */}
    </div>
  );
}

export default App;
