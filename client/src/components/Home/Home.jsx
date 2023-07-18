import Card from "../Card/Card";
import style from "./Home.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getCountries ,getActivities, countryFilter, ordeByName} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from '../Paginated/Paginated';
import WordldMap from "../../assets/World Map.svg"

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

            <div>
               <div>
           {/* ------------------Filtros-------------------- */}     
            <div>
                <h1>Filters</h1>
                <div>
                    <h3>By Continent</h3>
                  <select onChange={handleFilterContinent}>
                    <option value='All'>All Continents</option>
                    <option value='Africa'>Africa</option>
                    <option value='Antarctica'>Antartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                  </select>
                </div>
                

                <div>
                    <h3>By Activity</h3>
                   <select onChange={handleFilterActivity}>
                     <option value="All">All Activities</option>
                     {allActivities && allActivities.map((activity) => {
                         return (
                             <option value={activity.name}>{activity.name}</option>
                             )
                            })}
                  </select>
                </div>

                <button type="submit" onClick={handleFilter}>Apply</button>
                {/* <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)}/> */} {/*Sonido*/}
            </div>

                {/* ---------Ordenamiento por nombre y poblacion--------- */}
                
                <div>
                    <h1>Order By</h1>
                    <h3>Name/Population</h3>
                    <select onChange={handleOrderByName} value={orderBy}>
                      <option value="" disabled selected>Order by...</option>
                      <option value='ascName'>Names A - Z</option>
                      <option value='descName'>Names Z - A</option>
                       <option value='ascPopulation'>Population Low-High</option>
                       <option value='descPopulation'>Population High-Low</option>
                    </select>
                </div>
               
                <button onClick={()=>{reload()}}>Re-load</button>
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
                 <div>
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