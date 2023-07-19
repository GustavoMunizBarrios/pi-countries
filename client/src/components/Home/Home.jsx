import Card from "../Card/Card";
import style from "./Home.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getCountries ,getActivities, countryFilter, ordeByName} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from '../Paginated/Paginated';
import WordldMap from "../../assets/World Map.svg"
import arrow from '../../assets/arrowIcon.svg'

const reload = () => {
    window.location.reload(false);
}

const Home = () => {
    
    const dispatch= useDispatch();
    const countries = useSelector(state => state.countries)
    const allActivities = useSelector((state) => state.activities);

 //------------------------Paginado------------------------    
    const [currentPage, setCurrentPage] = useState(1); //este estado sirve para indicar cual es la pagina en la que estamos parados
    const elementsPerPage = 10; // esta es la cantidad de items que vamos a presentar por pagina

    const indexOfLastElement = currentPage * elementsPerPage; // obtenemos el indice del primer elemento y el ultimo de cada pagina.
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = countries?.slice(indexOfFirstElement, indexOfLastElement); // como countries es un array, utilizamos el metodo slice para quedarnos con los items desde el primero hasta el ultimo que vamos a presentar en la pagina en la que nos encontramos actualmente. 

    
 //------------------------useEffect------------------------    
    useEffect(()=> {
        dispatch(getCountries())
      },[dispatch])
      
      useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);

//----------------------ESTADOS PARA FILTROS Y ORDEN-------------------------

   const [continentFilter,setContinentFilter] = useState("All")
   const [activityFilter,setActivityFilter] = useState("All")
   const [orderBy, setOrderBy] = useState("");

//----------------------FILTROS-------------------------   
   
    const handleFilterContinent = (event) => {
        event.preventDefault();
        setContinentFilter(event.target.value)
    }

    const handleFilterActivity = (event) => {
        event.preventDefault();
        setActivityFilter(event.target.value)
    }

//----------------------ORDEN-------------------------
    const handleFilter = () => {
        setCurrentPage(1);
        let filters = {
          continent: continentFilter,
          activity: activityFilter,
        };
        dispatch(countryFilter(filters));
        setOrderBy(""); // setea el select de ordenamiento, para que cada vez que hago un filtro, vuelva a la option Order by...
      };

    const handleOrderByName = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;
        setOrderBy(selectedValue); //indico que el estado OrderBy tenga el valor de la option seleccionada
        dispatch(ordeByName(selectedValue));
      };
    
//------------------------Paginado------------------------ 
    const totalPages = Math.ceil(countries?.length / elementsPerPage) //dividimos el total de paises por la cantidad que vamos a colocar en cada pagina para obtener el total de paginas.
    
    const handlePageChange = (pageNumber) => { 
        setCurrentPage(pageNumber);
    };//handler que maneja la pagina en la cual estamos. 
    
    return (
        
        <div className={style.home}>

            <img src={WordldMap} alt="background world map" className={style.background_img}/>
            <div>
                <SearchBar handleFilter={handleFilter} onPageChange={handlePageChange}/>
            </div>

            <div className={style.home_principal}>
                <div className={style.filters}>
                            {/* ------------------Filtros-------------------- */}     
                    <div>
                        <div>
                            <h3>Continent</h3>

                            <div className={style.custom_select}>
                                <select className={style.continent_select} onChange={handleFilterContinent}>
                                    <option value='All'>All Continents</option>
                                    <option value='Africa'>Africa</option>
                                    <option value='Antarctica'>Antartica</option>
                                    <option value='Asia'>Asia</option>
                                    <option value='Europe'>Europe</option>
                                    <option value='North America'>North America</option>
                                    <option value='Oceania'>Oceania</option>
                                    <option value='South America'>South America</option>
                                </select>
                                <img className={style.select_arrow} src={arrow} alt="arrow" />
                            </div>
                        </div>

                        <div>
                            <h3>Activity</h3>

                            <div className={style.custom_select}>
                                <select className={style.continent_select} onChange={handleFilterActivity}>
                                <option value="All">All Activities</option>
                                {allActivities && allActivities.map((activity) => {
                                    return (
                                        <option value={activity.name}>{activity.name}</option>
                                        )
                                        })}
                                </select>
                                <img className={style.select_arrow} src={arrow} alt="arrow" />
                            </div>
                        </div>

                        <button className={style.filter_btn} type="submit" onClick={handleFilter}>
                            {/* <svg className={style.search_btn_svgIcon} viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> */}
                                Filter
                        </button>
                    
                    </div>

                    {/* ---------Ordenamiento por nombre y poblacion--------- */}
                    <div>
                        <h3>Name/Population</h3>
                        <div className={style.custom_select}>
                            <select className={style.continent_select} onChange={handleOrderByName} value={orderBy}>
                            <option value="" disabled selected>Order by...</option>
                            <option value='ascName'>Names A - Z</option>
                            <option value='descName'>Names Z - A</option>
                            <option value='ascPopulation'>Population Low-High</option>
                            <option value='descPopulation'>Population High-Low</option>
                            </select>
                            <img className={style.select_arrow} src={arrow} alt="arrow" />
                        </div>

                    </div>
                
                    <button className={style.reset_btn} onClick={()=>{reload()}}>
                        <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                        <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
                        </svg>
                        Re-load
                    </button>
                </div>

                <div className={style.container}>
                    {currentElements.length !== 0 ? 
                    currentElements.map(({id, name, flag_img, continent}) => {
                        return (
                        <Card
                        key={id}
                        id={id}
                        name={name}
                        flag_img={flag_img}
                        continent={continent}
                        />
                    )})
                    : (<p>Country not Found</p>)
                    }
                    <div className={style.paginated}>
                        <Paginado
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChangePage={handlePageChange}
                        />
                    </div>
                </div>
            </div>

       </div>
    )
    
}


export default Home;