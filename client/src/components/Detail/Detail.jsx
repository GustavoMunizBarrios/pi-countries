import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import { useEffect } from "react";
import WordldMap from "../../assets/World Map.svg"
import style from './Detail.module.css'

const Detail = () => {
  
  const {id}= useParams();
  const countries= useSelector(state => state.countryDetail)
  const dispatch= useDispatch();

  useEffect(()=> {
    dispatch(getCountryDetail(id))
  },[id])

  return (
    <div className={style.main}>
      <img src={WordldMap} alt="background world map" className={style.background_img}/>
      <div className={style.card}>

        <div>
          <h1>{countries?.name}</h1>
          <img className={style.image} src={countries?.flag_img} alt={countries?.name} />
        </div>

        <div>
          <div>
            <h2>Country Data</h2>
            <h3>Continent: {countries?.continent} </h3>
            <h3>Capital: {countries?.capital}</h3>
            <h3>Subregion: {countries?.subregion}</h3>
            <h3>Area: {countries?.area} km²</h3>
            <h3>Population: {countries?.population}</h3>
          </div>

          <div>

            <h2>Tourist Activities</h2>

            <div> 
              {
              countries?.Activities?.length > 0 ?
              (
              countries?.Activities?.map((activity) => (
                  <div>
                    <h3>{activity.name}</h3>
                    <h5>Dificulty: {activity.difficulty}</h5>
                    <h5>Duration: {activity.duration} hs</h5>
                    <h5>Season: {activity.season}</h5>
                  </div>
                )))
              : (<p>No Tourist Activities added so far</p>)  
              }
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Detail;