
import { NavLink } from "react-router-dom";
import style from './Nav.module.css'
import planet from "../../assets/planet_comprimido.png"
/* import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png' */

const Nav = () => {
    return (
    <div className={style.navigation}>
        
        <NavLink to="/home" className={style.home_btn}>
          <img src={planet} alt="Image of planet earth" className={style.home_btn_img}/> 
          <p>Home</p> 
        </NavLink>

        <NavLink to="/form">
          <p className={style.create_btn}>Create Activity</p>
        </NavLink>

        <NavLink to="/">
          <p className={style.create_btn}>Exit</p>
        </NavLink> 


{/*         <div className={style.links}>

          <a href="https://www.linkedin.com/in/developer-gustavo-mu%C3%B1iz-barrios-86708b121/"
          target="_blank"
          rel="noreferrer"
          className={style.link}
          >
            <img src={linkedin} alt="linkedin" className={style.link_img} />
          </a>

          <a href="https://github.com/GustavoMunizBarrios"
          target="_blank"
          rel="noreferrer"
          className={style.link}
          >
            <img src={github} alt="github" className={style.link_img} />
          </a>

        </div> */}
    </div>
    )
}

export default Nav;