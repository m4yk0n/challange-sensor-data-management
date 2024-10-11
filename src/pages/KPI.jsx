import React, { useState, useEffect } from "react";
import "../styles/Dashboards.css";

function KPI({ indicePeriodo, avancar, voltar }) {
    const periodos = ["24 horas", "48 horas", "1 semana", "1 mês"];

    // Estado das médias
    const [maiorMedia, setMaiorMedia] = useState(2);
    const [menorMedia, setMenorMedia] = useState(4);
    const [totalMedia, setTotalMedia] = useState(10);

    // Estado dos sensores
    const [maiorSensor, setMaiorSensor] = useState(2);
    const [menorSensor, setMenorSensor] = useState(20);
    const [totalSensor, setTotalSensor] = useState(300);

    useEffect(() => {
        atualizarKPIs(indicePeriodo);
    }, [indicePeriodo]);

    function atualizarKPIs(indice) {
        switch (periodos[indice]) {
            case "24 horas":
                setMaiorMedia(52);
                setMenorMedia(4);
                setTotalMedia(10);
                setMaiorSensor(2);
                setMenorSensor(20);
                setTotalSensor(300);
                break;
            case "48 horas":
                setMaiorMedia(90);
                setMenorMedia(5);
                setTotalMedia(40);
                setMaiorSensor(24);
                setMenorSensor(202);
                setTotalSensor(3050);
                break;
            case "1 semana":
                setMaiorMedia(190);
                setMenorMedia(20);
                setTotalMedia(300);
                setMaiorSensor(244);
                setMenorSensor(2220);
                setTotalSensor(30430);
                break;
            case "1 mês":
                setMaiorMedia(400);
                setMenorMedia(110);
                setTotalMedia(1500);
                setMaiorSensor(412);
                setMenorSensor(2410);
                setTotalSensor(30550);
                break;
            default:
                break;
        }
    }

    return (
        <div className="KPIS">
            <h2>KPIs</h2>
            <h3 className="navegacao-kpis">
                <span id="voltar" onClick={voltar}> L </span>
                <p>{periodos[indicePeriodo]}</p>
                <span id="avancar" onClick={avancar}> R </span>
            </h3>
            <div className="KPI">
                <h3>MAIOR</h3>
                <span className="indicador">{maiorMedia}</span>
                <p>SENSOR {maiorSensor}</p>
            </div>
            <div className="KPI">
                <h3>MENOR</h3>
                <span className="indicador">{menorMedia}</span>
                <p>SENSOR {menorSensor}</p>
            </div>
            <div className="KPI">
                <h3>TOTAL</h3>
                <span className="indicador">{totalMedia}</span>
                <p>{totalSensor} SENSORES</p>
            </div>
        </div>
    );
}

export default KPI;
