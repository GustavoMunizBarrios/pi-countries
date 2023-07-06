const { Router } = require('express');
const DB_upload = require('../../DB_upload')
const DB_info = require('../../controllers/DB_info')
const router = Router();

// GET | /countries
//Obtiene un arreglo de objetos, donde cada objeto es un país con toda su información.
router.get('/', async (req, res) => {
    const {name} = req.query //guarda la info que se obtiene por query (name)
    await DB_upload() //Guarda en la DB todos los paises de la api.
    const DBinfo = await DB_info() // se obtiene toda la info de paises de la DB
    
    try {
        if(!name) {
            //si no se pasa "name" por query, se devuelve a todos los paises. 
            return res.status(200).json(DBinfo)
        }

//GET | /countries/name?="..." 
        else {
            //si se pasa a "name" por query, se hace un filtrado de lo que se tiene en la DB 
            const filteredCountry = DBinfo.filter(element => //crea un nuevo arreglo con todos los elementos que cumplan con cierta condición.
                element.name.toLowerCase(). //se accede a la propiedad name de cada elemento del arreglo DBinfo. toLowerCase() se utiliza para convertir el nombre en minúscula
                includes(name.toLowerCase()) // Comprueba si la subcadena name está presente en el nombre del elemento actual. Si es así, el elemento pasará el filtro y se incluirá en el nuevo arreglo filteredCountry
            );

            //Si filteredCountry esta vacio, devuelve un estado 400 y un mensaje.
            if(!filteredCountry.length) return res.status(400).json({message: 'Country not found'}) // lo saque para poder hacer el "country not found" en el front, necesitaba un array vacio.

            return res.status(200).json(filteredCountry)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
});

//GET | /countries/:idPais
//Esta ruta obtiene el detalle de un país específico. Es decir que devuelve un objeto con la información pedida en el detalle de un país.
//El país es recibido por parámetro (ID de tres letras del país).
//Tiene que incluir los datos de las actividades turísticas asociadas a este país.

router.get('/:idPais', async (req, res) => {
    const {idPais} = req.params; //guarda el ID que se obtiene por params (ID de tres letras del país)
    const DBinfo = await DB_info(); // se obtiene toda la info de paises de la DB

    try {
        if(idPais) { //si se recibe por params un ID
            // Busca un pais dentro del arreglo DBinfo que tenga un id igual al valor de idPais (ID de tres letras del país)
            const idCountry = await DBinfo.find(country => country.id === idPais); 
            
            if(!idCountry) return res.status(400).send('ID of country not found');

            return res.status(200).json(idCountry); 
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;
