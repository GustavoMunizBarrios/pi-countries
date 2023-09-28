import { GET_ACTIVITIES, DELETE_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_DETAIL, CREATE_ACTIVITY,SEARCH_COUNTRY, ORDER_BY_NAME, FILTER_COUNTRY } from "./action-types";

const initialState = {
    countries: [],
    allCountries: [],
    countryDetail: {},
    activities: [],
}

const reducer = (state = initialState, {type,payload}) => {
    switch(type){

        case GET_COUNTRIES:
            return { ...state, countries: payload, allCountries: payload };

        case GET_COUNTRY_DETAIL:
            return { ...state, countryDetail: payload };

        case CREATE_ACTIVITY:
            return { ...state}
        
        case GET_ACTIVITIES:
            return { ...state, activities: payload };
            
        case DELETE_ACTIVITIES:
            return { ...state};

        case SEARCH_COUNTRY:
            let paisBuscado = payload
            let paisesfilt = state.countries
            if(state.countries !== state.allCountries){ //si se aplico un filtro a contries entonces buscara el "paisBuscado" dentro de este filtro
                 paisBuscado = paisesfilt.filter( //filter encuentra el pais/paises que coincide con el criterio de busqueda del payload
                    (country) => payload.some( //some se utiliza para comparar si el id de cada país coincide con algún id de la lista de búsqueda proporcionada en el payload.
                        (count) => count.id === country.id
                    )
                )
            }
            return {...state, countries:paisBuscado};       

        // -------------------------------------FILTROS-----------------------------------

        case FILTER_COUNTRY:
            let paisesFiltrados = [...state.allCountries] // copia de la lista completa de los paises

            if(payload.continent !== "All"){ // si el valor del continente no es All entonces filtra deacuerdo al continente del payload
                paisesFiltrados = paisesFiltrados.filter(el => el.continent === payload.continent) //filtrar los países cuyo continente coincida con el payload.continent
            }

            if(payload.activity !== "All"){ // si el valor de la actividad no es All entonces filtra deacuerdo con el payload
                //filtra los paises que contienen la actividad especificada en payload.activity
                paisesFiltrados = paisesFiltrados.filter(country => country.Activities.find(activity => activity.name === payload.activity))
            }

            return {
                ...state,
                countries: paisesFiltrados,
            }

        // -------------------------------------ORDENAMIENTOS----------------------------------------

        case ORDER_BY_NAME:
            const allContriesCopy = [...state.countries] // copia de la lista de paises actual (estos pueden estar filtrados)

            if(payload === "ascName") {
                //ordenamiento ascendente de la lista de países A-Z en la propiedad "name" de cada pais. "localeCompare" realiza una comparación alfabética sensible a mayúsculas y minúscula
                return {...state, countries: allContriesCopy.sort((a, b) => a.name.localeCompare(b.name))} 
            }
            if(payload === "descName") {
                //ordenamiento descendente de la lista de países Z-A en la propiedad "name" de cada pais.
                return {...state,countries: allContriesCopy.sort((a, b) => b.name.localeCompare(a.name))}
            }  
            if(payload === "ascPopulation") {
                // ordenamiento ascendente de la lista de países de acuerdo a su población
                return {...state,countries: allContriesCopy.sort((a, b) => parseInt(a.population, 10) - parseInt(b.population, 10))}
            } 
            if(payload === "descPopulation") {
                // ordenamiento descendente de la lista de países de acuerdo a su población
                return {...state,countries: allContriesCopy.sort((a, b) => parseInt(b.population, 10) - parseInt(a.population, 10))}
            } 
            break;

        default:
            return {...state};
    }
};

export default reducer;