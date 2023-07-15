import { NavLink } from "react-router-dom"
import style from "./Landing.module.css"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import compass from "../../assets/compass.png"

const Landing = ()=>{
    return(
        <div>
            <div>
              <div className={style.topLeft}>
                <a href="https://github.com/GustavoMunizBarrios"
                target="_blank"
                rel="noreferrer"
                className={style.alink}
                >
                  <img src={linkedin} alt="linkedin" className={style.img} />
                </a>
                <a href="https://github.com/GustavoMunizBarrios"
                target="_blank"
                rel="noreferrer"
                className={style.alink}
                >
                  <img src={github} alt="github" className={style.img} />
                </a>
              </div>
              <div>
                <h5>Henry PI</h5>
                <h1>Countries of the world</h1>
                <NavLink to="/home"> <button>Start</button> </NavLink>
              </div>
            </div>
            {/* <div className={style.shadow}>
            <div className={style.topLeft} >
            <a
            href="https://github.com/GustavoMunizBarrios"
            target="_blank"
            rel="noreferrer"
            className={style.alink}
          >
            <img src={linkedin} alt="linkedin" className={style.img} />
          </a> 
          <a
            href="https://github.com/GustavoMunizBarrios"
            target="_blank"
            rel="noreferrer"
            className={style.alink}
          >
            <img src={github} alt="github" className={style.img} />
          </a> 
            </div>

            <div className={style.text}> 
             <h5 className={style.textsmall}>Henry PI</h5>
             <h1>Countries App Proyect</h1>
             <NavLink to="/home"> <img className={style.rosa} src={rosadelosvientos} alt="start" /> </NavLink>
             
            </div>
            </div> */}
        </div>
    )
}
export default Landing;