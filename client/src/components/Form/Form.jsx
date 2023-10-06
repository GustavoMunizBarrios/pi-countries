import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef} from "react";
import { getCountries, createActivity, getActivities, deleteActivities } from '../../redux/actions';
import validate from "./validate"; //importo la funcion de validaciones para mi form
import style from "./Form.module.css"
import WordldMap from "../../assets/World Map.svg"

//realiza la recarga de la página actual del navegador web. 
//El parámetro false que se pasa a window.location.reload indica que la recarga se realice desde la caché del navegador, 
//es decir, se utiliza la versión almacenada en la memoria del navegador en lugar de solicitar la página nuevamente al servidor.
const reload = () => {
    window.location.reload(false);
}

const Form = () => {
    const dispatch = useDispatch();
    const countriesName = useSelector((state) => state.countries);
    //ordena alfabeticamente los paises
    const countriesOrden = countriesName.sort((a, b) => a.name.localeCompare(b.name))

    const theActivities = useSelector((state) => state.activities);
    //ordena alfabeticamente las actividades
    const activitiesOrden = theActivities.sort((a, b) => a.name.localeCompare(b.name))

    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '',
        countryId: []
    });
    
    const [errors, setErrors] = useState({});
    
    //se ejecuta cuando se produce un cambio en el input o select, indica que se guarde dentro del estado input, 
    //en la propiedad con el mismo nombre que tiene event.target.name, 
    //y llama a la función setErrors para realizar validaciones en el nuevo estado input.

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }
    
    //se ejecuta cuando se selecciona el pais o los paises donde se realiza la nueva actividad. 
    //Concatena el valor proporcionado en el select con los valores previos en la propiedad countryId, 
    //llama a la función setErrors para realizar validaciones en el nuevo estado input.   
    
    const handleSelectCountries = (event) => {
        setInput({
            ...input,
            countryId: [...input.countryId, event.target.value]
        })
        setErrors(validate({
            ...input,
            countryId: [...input.countryId, event.target.value]
        }))
    }

    

    const handleSubmit = (event) => { //se ejecuta cuando se envía el formulario de creación de actividad
        event.preventDefault();
        const errorSave = validate(input); // se asigna el resultado de la funcion validate, pasandole input como parametro.

        //si hay alguna actividad con el mismo nombre que el valor ingresado en el campo input.name, existName se establece en 1, de lo contrario, se establece en 0.
        const existName = theActivities.find(activity => activity.name.toLowerCase() === input.name.toLowerCase()) ? 1 : 0; 

        if (existName === 1) {
            alert("Activity already exists");
        } 
        else {
            dispatch(createActivity(input)) //se despacha la action pasandole como argumento "input", que es un objeto con todo lo necesario para crear una nueva actividad. 
            alert('Activity Created')
            setInput({
                name: '', 
                difficulty: '', 
                duration: '', 
                season: '',
                countryId: []
            }) // borrar los datos ingresados en el formulario.
            reload(); //recargar 
        }
    }

    //------------------------Delete Activity------------------------
    const [delAct, setDelAct] = useState('');

    //se ejecuta cuando se selecciona una actividad para eliminar en el campo de selección correspondiente. 
    //Actualiza el estado delAct con el nombre de la actividad seleccionada.
    const handleSelectDelete = (event) => {
        setDelAct(event.target.value)
    }

    const handleSubmitDelete = (event) => {
        event.preventDefault();
        dispatch(deleteActivities(delAct))
        alert('Activity Deleted!')
        setDelAct('');
        reload();
    }
    
    //------------------------useEffect------------------------

    //obtiene la lista de países del servidor cuando el componente se monta por primera vez
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);
    
    //obtiene la lista de actividades del servidor cuando el componente se monta por primera vez
    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);

    // se utiliza para eliminar las actividades almacenadas
    useEffect(() => {
        dispatch(deleteActivities())
    }, [dispatch]);

    return (
    <div className={style.main}>
            <img className={style.background_img} src={WordldMap} alt="background world map"/>

            <div className={style.contenedor}>
                {/* -----------------------Create activity sector----------------------- */}
                <div className={style.contenedorCreate}>
                    <h2>Create your Activity</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div className={style.custom_select}>
                            <div className={style.custom_box}>
                                <label>Name: </label>
                                <input onChange={handleChange} type="text" value={input.name} name='name' placeholder="Activity name"/>
                            </div>
                            {errors.name && <p className={style.formError}>{errors.name}</p>}
                            
                        </div>

                        <div className={style.custom_select}>
                            <label>Difficulty: </label>
                            <select className={style.continent_select} onChange={handleChange} name='difficulty'>
                                <option value="" disabled selected>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {errors.difficulty && <p className={style.formError}>{errors.difficulty}</p>}
                        </div>

                        <div className={style.custom_select}>
                            <label>Duration: </label>
                            <select className={style.continent_select} onChange={handleChange} name='duration'>
                                <option value="" disabled selected>Select</option>
                                <option value="1">1 hs</option>
                                <option value="2">2 hs</option>
                                <option value="3">3 hs</option>
                                <option value="4">4 hs</option>
                                <option value="5">5 hs</option>
                                <option value="6">6 hs</option>
                                <option value="7">7 hs</option>
                                <option value="8">8 hs</option>
                                <option value="9">9 hs</option>
                                <option value="10">10 hs</option>
                                <option value="11">11 hs</option>
                                <option value="12">12 hs</option>
                                <option value="13">13 hs</option>
                                <option value="14">14 hs</option>
                                <option value="15">15 hs</option>
                                <option value="16">16 hs</option>
                                <option value="17">17 hs</option>
                                <option value="18">18 hs</option>
                                <option value="19">19 hs</option>
                                <option value="20">20 hs</option>
                                <option value="21">21 hs</option>
                                <option value="22">22 hs</option>
                                <option value="23">23 hs</option>
                                <option value="24">24 hs</option>
                            </select>
                            {errors.duration && <p className={style.formError}>{errors.duration}</p>}
                        </div>

                        <div className={style.custom_select}>
                            <label>Season: </label>
                            <select className={style.continent_select} onChange={handleChange} name='season'>
                                <option value="" disabled selected>Select</option>
                                <option value="Summer">Summer</option>
                                <option value="Autumn">Autumn</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                            </select>
                            {errors.season && <p className={style.formError}>{errors.season}</p>}
                        </div>

                        <div className={style.custom_select}>
                            <label>Country: </label>
                            <select className={style.continent_select} onChange={handleSelectCountries}>
                                <option value="" disabled selected>Select country</option>  
                                {/* Esta opción deshabilitada y seleccionada por defecto sirve como un texto de instrucción para que el usuario seleccione al menos un país. No se puede seleccionar y no tiene ningún valor asociado. */}
                                {countriesOrden.map((country) => (
                                    <option value={country.id}>{country.name}</option>
                                    // se generan opciones para el menú desplegable. Cada objeto country genera una opción con su id como valor y su name como texto visible para el usuario. 
                                ))}
                            </select>
                        
                            {errors.countryId && <p className={style.formError}>{errors.countryId}</p>}
                            <div >
                                <ul>
                                    <p>{input.countryId.map(countrieId_input => countriesName.map(countrie_state => {
                                    if (countrie_state.id === countrieId_input) { 
                                        return countrie_state.name + ', ';
                                    }
                                    }))}
                                    </p>
                                </ul>
                            </div>
                            {/* Se mapea la propiedad countryId del objeto input, donde se guardaron los id de los paises seleccionados anteriormente. Luego se vuelve a hacer otro mapeo, esta vez de la constante countriesName, que contiene el valor del estado countries que es un array con todos los paises. En este segundo mapeo se compara si el Id de alguno de los paises dentro del estado countries coincide con el id de los paises seleccionados, que se renderice en una etiqueta <p> el nombre de ese pais + , */}
                        </div>

                        <div>
                            <button className={style.create_btn} type="submit" disabled={input.name === ''||input.difficulty==='' || input.duration===''||input.season===''||input.countryId.length<0||errors.name||errors.difficulty||errors.duration||errors.season||errors.countryId}>Create</button>
                        </div>

                    </form>
                </div>

                {/* -----------------------Delete activity sector----------------------- */}
                <div className={style.contenedorDelete}>
                    <div>
                        <h2>Delete Activity</h2>
                        <form onSubmit={(event) => handleSubmitDelete(event)}>
                        
                            <div className={style.custom_select}>
                                <div>
                                    <select className={style.continent_select} onChange={handleSelectDelete}>
                                        <option value="" disabled selected>Activity</option>
                                        {activitiesOrden && activitiesOrden.map((activity) => {
                                            return (
                                                <option value={activity.name}>{activity.name}</option>
                                            )
                                        })}
                                        {/* si la constante theActivities que tiene asignado el valor del estado activities, que es listado de actividades, existe osea si hay actividades dentro del estado, se hace un mapeo de esta constante en el que por cada actividad de renderiza una opcion con el valor del nombre de la actividad y que renderice tambien su nombre. De esta forma le asignamos el valor del nombre de la actividad al estado delAct, que luego se le pasa como argumento a la action deleteActivities, y de esta forma se elimina dicha actividad. */}
                                    </select>
                                </div>
                            </div>

                            <p className={style.activity_delete}>Activity to delete: {delAct}</p>

                            <div>
                                <button className={style.delete_btn} type="submit" disabled={delAct===''}>Delete</button>
                            </div>
                        </form>
                    </div>
                {/* -----------------------Reload sector----------------------- */}
                </div>

            </div>

            <div>
                <button className={style.reset_btn}  onClick={reload}>
                    <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                        <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
                    </svg>
                    Reset Form
                </button>
            </div>
        </div>
    )
}

export default Form;