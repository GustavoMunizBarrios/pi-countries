import React from "react";
import CardStyles from "./Card.module.css";
import { NavLink } from "react-router-dom";

// Componente DUMB -> solo se encarga de renderizar info

const Card = ({ id, name, flag_img, continent }) => {
  return (
    <NavLink to={`/detail/${id}`}>
      <div className={CardStyles.Card}>
        <div>
          <div>
            <img className={CardStyles.imgCard} src={flag_img} alt="Country" />
          </div>
          <div>
            <h4>{name}</h4>
            <h6>Continent: {continent}</h6>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;