import React from "react";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ id, name, flag_img, continent }) => {
  return (
    <NavLink to={`/detail/${id}`}>
      <div className={style.card}>
        <div>
          <div>
            <img className={style.card_img} src={flag_img} alt="Country" />
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