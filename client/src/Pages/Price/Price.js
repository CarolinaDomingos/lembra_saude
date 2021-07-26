import React from "react";
import "./Price.css"
import Menu from "../Home/component/Menu/Menu";
const Price = () => {
    return (
        <div>
            <Menu />
        <div className="container">
            
            <div className="price_free">
                <div className="row">
                    <h5>Com ads</h5>
                    <p>Calendário:</p>
                    <ul>
                        <li>Consultas</li>
                        <li>Vacinas</li>
                        <li>Levantamento de medicamentos</li>
                    </ul>
                    <p>Plano alimentar:</p>
                    <ul>
                        <li>Tipo de refeição</li>
                        <li>Hora</li>
                    </ul>
                    <label>0€/mês</label>
                </div>
            </div>
            <div className="price_paid">
                <div className="row">
                    <h5>Sem ads</h5>
                    <p>Calendário:</p>
                    <ul>
                        <li>Consultas</li>
                        <li>Vacinas</li>
                        <li>Levantamento de medicamentos</li>
                    </ul>
                    <p>Plano alimentar:</p>
                    <ul>
                        <li>Tipo de refeição</li>
                        <li>Hora</li>
                    </ul>
                    <label>5€/mês</label>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Price;
