import "./Dashboards.css"

function KPI() {
 return(
    <div className="KPIS">
        <h2>KPIs</h2>
        <div className="KPI">
        <h3>MAIOR</h3>
        <span className="indicador">100</span>
        </div>
        <div className="KPI">
        <h3>MENOR</h3>
        <span className="indicador">10</span>
        </div>
        <div className="KPI">
        <h3>TOTAL</h3>
        <span className="indicador">210</span>
        </div>
    </div>
 )
}

export default (
    KPI
)