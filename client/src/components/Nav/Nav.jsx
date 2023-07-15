
import { NavLink } from "react-router-dom";
import style from './Nav.module.css'
import linkedin from '../../assets/profilePicture.png'
import github from '../../assets/profilePicture.png'

const Nav = () => {
    return (
    <div className={style.barra}>
        
        <NavLink to="/home">Countries PI</NavLink>
        <NavLink to="/">Exit</NavLink> 
        <NavLink to="/form">Create Activity</NavLink>
        <a
            href="https://www.linkedin.com/in/developer-gustavo-mu%C3%B1iz-barrios-86708b121/"
            target="_blank"
            rel="noreferrer"
            /* className={style.alink} */
          >
            {/* <img src={linkedin} alt="linkedin" className={style.img} /> */}
          </a> 
          <a
            href="https://github.com/GustavoMunizBarrios"
            target="_blank"
            rel="noreferrer"
            /* className={style.alink} */
          >
            {/* <img src={github} alt="github" className={style.img} /> */}
          </a> 
    </div>
    )
}

export default Nav;