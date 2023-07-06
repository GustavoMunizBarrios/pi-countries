const { Country } = require('../src/db');
const {Activity} = require('../src/db')

//Se obtiene la informacion de todos los paises en la DB, incluyendo la relación que cada país tiene con el modelo Activity
const DB_info = async () => {
    try {
        return await Country.findAll({ // busca y recupera todos los países de la base de datos.
            //incluiye la relación entre el modelo Country y Activity. 
            //Esto permite obtener la información de las actividades relacionadas con cada país.
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: { //through se utiliza para especificar que no se desean incluir los atributos adicionales de la tabla intermedia entre Country y Activity
                    attributes: [],
                },
            }
        }) 
    } catch (error) {
        console.log('Error when obtaining the countries of the DB and/or the activities', error);
    }
};

module.exports = DB_info;