import "./Dashboards.css"
import KPI from "./KPI"
import Graficos from "./Graficos"

function Dashboards() {
    return(
        <div className="dashboard">
            <KPI />
            <Graficos />
        </div>
    );
}

export default (
    Dashboards
);