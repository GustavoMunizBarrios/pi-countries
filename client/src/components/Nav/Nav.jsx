
import { NavLink } from "react-router-dom";
import style from './Nav.module.css'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'

const Nav = () => {
    return (
    <div className={style.barra}>
        
        <NavLink to="/home">Countries home</NavLink>
        <NavLink to="/">Exit</NavLink> 
        <NavLink to="/form">Create Activity</NavLink>
        <div className={style.links}>

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

  </div>
    </div>
    )
}

export default Nav;