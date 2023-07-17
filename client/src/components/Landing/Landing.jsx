import { NavLink } from "react-router-dom"
import style from "./Landing.module.css"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import planet from "../../assets/planet_comprimido.png"
/* import background from "../../assets/background01.png" */
import background from "../../assets/background01.svg"

const Landing = ()=>{
    return(
        <div >
            <div className={style.landing}>
            <img src={background} alt="background" className={style.background}/>
            <img src={background} alt="background" className={style.background02}/>
              
              {/* BANDERAS */}
              <img src="https://flagcdn.com/ke.svg " alt="flag of kenya" className={`${style.flag_img} ${style.flag_img_kenia}`}/>
              <img src="https://flagcdn.com/mx.svg " alt="flag of mexico" className={`${style.flag_img} ${style.flag_img_mexico}`}/>
              <img src="https://flagcdn.com/se.svg" alt="flag of sweden" className={`${style.flag_img} ${style.flag_img_sweden}`}/>
              <img src="https://flagcdn.com/fr.svg" alt="flag of france" className={`${style.flag_img} ${style.flag_img_france}`}/>
              <img src=" https://flagcdn.com/co.svg" alt="flag of colombia" className={`${style.flag_img} ${style.flag_img_colombia}`}/>
              <img src="https://flagcdn.com/gb.svg" alt="flag of uk" className={`${style.flag_img} ${style.flag_img_uk}`}/>
              <img src="https://flagcdn.com/es.svg" alt="flag of spain" className={`${style.flag_img} ${style.flag_img_spain}`}/>
              <img src=" https://flagcdn.com/ar.svg" alt="flag of argentina" className={`${style.flag_img} ${style.flag_img_argentina}`}/>
              <img src=" https://flagcdn.com/us.svg" alt="flag of usa" className={`${style.flag_img} ${style.flag_img_usa}`}/>
              <img src=" https://flagcdn.com/br.svg" alt="flag of brazil" className={`${style.flag_img} ${style.flag_img_brazil}`}/>
              <img src=" https://flagcdn.com/cl.svg" alt="flag of chile" className={`${style.flag_img} ${style.flag_img_chile}`}/>
              <img src=" https://flagcdn.com/cn.svg" alt="flag of china" className={`${style.flag_img} ${style.flag_img_china}`}/>
              <img src=" https://flagcdn.com/cu.svg" alt="flag of cuba" className={`${style.flag_img} ${style.flag_img_cuba}`}/>


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

              <div className={style.title}>
                <h1>Countries of the <br /> world</h1>
                <NavLink to="/home">
                  <button className= {style.button}>
                    <svg className={style.svgIcon} viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                    Explore
                  </button>
                </NavLink>
              </div>

              <img src={planet} alt="Image of planet earth" className={style.imgEarth}/>
            </div>
        </div>
    )
}
export default Landing;