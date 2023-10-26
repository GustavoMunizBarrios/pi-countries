import React from "react";
import { useState, useRef } from "react";
import { useDispatch} from "react-redux";
import { searchCountry } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import planet from "../../assets/planet_comprimido.png"
import style from './SearchBar.module.css'
import menuIcon from "../../assets/menu-svg.svg"
/* import linkedin from '../../assets/profilePicture.png'
import github from '../../assets/profilePicture.png' */

const reload = () => {
    window.location.reload(false);
}

export default function SearchBar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
   
  const handleChange = (event) => {
    console.log(name)
    const value = event.target.value;
    setName(value);
  }; 

  const handleSubmit = (event) => {
    event.preventDefault(); //evita que se recargue la página
    dispatch(searchCountry(name));
    setName('')
    props.onPageChange(1); //se llama a la función onPageChange y setea la pagina actual en 1
  };
  
  return (
    <div className={style.navigation}>
      <button onClick={()=>{reload()}} className={style.home_btn}>
        <img src={planet} alt="Image of planet earth" className={style.home_btn_img}/> 
        <p>Home</p> 
      </button>

      <div className={style.search}>
        <div className={style.group}>
          <svg className={style.icon}aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input className={style.input} type='search' placeholder=' Search Country...' value ={name} onChange={(event) => handleChange(event)}/>
        </div>

        <button className={style.search_btn} type='submit'  disabled={name===''}  onClick={(event) => handleSubmit(event)}>
            <svg className={style.search_btn_svgIcon} viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
              Search
        </button>

        <button className={style.reset_btn}  type='submit' onClick={(event) => props.handleFilter(event)}>
          <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
          <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
          </svg>
          <span>
            Reset search 
          </span>
        </button>

      </div>

      <NavLink to="/form">
        <p className={style.create_btn}>Create Activity</p>
      </NavLink>

      <NavLink to="/">
        <p className={style.create_btn}>Exit</p>
      </NavLink> 

      <button className={style.hamburgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img className={style.menuIcon} src={menuIcon} alt="Menu Icon" />
      </button>
      {isMenuOpen && (
        <div className={style.menuOverlay}>
          <div className={style.menuItems}>
            <NavLink to="/form">
              <p className={style.create_btn_activity}>Create Activity</p>
            </NavLink>
            <NavLink to="/">
              <p className={style.create_btn_exit}>Exit</p>
            </NavLink> 
          </div>
        </div>
      )}

      <a
        href="https://www.linkedin.com/in/developer-gustavo-mu%C3%B1iz-barrios-86708b121/"
        target="_blank"
        rel="noreferrer"
      >
        {/* <img src={linkedin} alt="linkedin" /> */}
      </a> 
      <a
        href="https://github.com/GustavoMunizBarrios"
        target="_blank"
        rel="noreferrer"
      >
        {/* <img src={github} alt="github"/> */}
      </a> 

    </div>
  )
}