// Carga la información de la API de países a la DB Country
const axios =require('axios');
const {Country} = require('./src/db.js')

const DB_upload = async () => {
    // se consulta la DB "Country" para obtener todos los países existentes usando findAll(). Esto devuelve una lista de países almacenados en la DB.
    const dbCountries = Country.findAll();

    if (!dbCountries.length) { // Si no se encuentran países en la base de datos, se obtiene los datos de la API de países.
        const URL = await axios.get("http://localhost:5000/countries") //Solicitud GET a la api
        const countryData = await URL.data.map((pais) => { //realiza un mapeo de los datos obtenidos de la API 
            return {
                id: pais.cca3,
                name: pais.name.common,
                flag_img: pais.flags.svg,
                continent: pais.continents? pais.continents[0]: "undefined",
                capital: pais.capital ? pais.capital[0] : "undefined",
                subregion: pais.subregion ? pais.subregion : "undefined",
                area: pais.area,
                population: pais.population
            }
        })
        // recorre el arreglo countryData en un bucle for y se utiliza Country.findOrCreate para buscar o crear un registro en la
        // tabla de países de la base de datos. Si el país no existe en la base de datos, se crea utilizando los valores correspondientes del arreglo countryData.
        for (let i =0; i < countryData.length; i++) { 
            await Country.findOrCreate({
                where: {name: countryData[i].name},
                defaults: countryData[i]
            })
        }
        console.log("The DB has been updated.");
    }
}
module.exports = DB_upload;