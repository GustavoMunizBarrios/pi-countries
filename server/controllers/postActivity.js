const { Activity } = require('../db.js');

//Creo una nueva Actividad y la relaciono con el pais correspondiente

const postActivity = async (name, difficulty, duration, season, countryId) => { //atributos de una actividad y el ID del país 
    try {
        //'activity' es la actividad encontrada o creada con los atributos proporcionados,
        // 'created' es un valor booleano que indica si se creó una nueva actividad (true) o no (false).
        let [activity, created] = await Activity.findOrCreate({
            where: {
                name, 
                difficulty, 
                duration, 
                season,
            }
        })

        console.log(created); //visualización de si se creo o no una activity nueva

        // se utiliza el método setCountries del objeto activity para establecer la relación entre la actividad y el país correspondiente
        await activity.setCountries(countryId);
        return activity; //devuelvo el objeto con mi activity, relacionada con el pais correspondiente. 
    } catch (error) {
        console.log('Error creating activity', error);
    }
};

module.exports = postActivity;