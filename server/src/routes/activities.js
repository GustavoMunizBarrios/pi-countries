const { Router } = require('express');
const postActivity = require('../../controllers/postActivity')
const deleteActivity = require('../../controllers/deleteActivity.js')
const { Activity } = require('../db');

const router = Router();

//GET | /activities
//Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.

router.get('/', async (req, res) => {
    try {
      //Se buscan todas las actividades de la tabla/modelo Activity.
      const DataActivities = await Activity.findAll() 
      res.status(200).json(DataActivities)

    } catch (error) {
      return res.status(400).send(error)
    }
})

//POST | /activities
//Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.

router.post('/', async (req, res) => {
    //Se extrae de body todos los atributos del modelo Activity y el ID del Pais para establecer la relacion 
    const {name, difficulty, duration, season, countryId} = req.body 
    try {
      // Se llama al controlador postActivity pasandole los atributos de Activity, 
      // El controlador devuelve un objeto con la nueva actividad, relacionada con el pais correspondiente.
      const newActivity = await postActivity(name, difficulty, duration, season, countryId) 
      return res.status(200).json(newActivity) 

    } catch (error) {
        return res.status(400).send(error)
    }
});

//DELETE | /?=name="..."
//Elimina una actividad a partir de un nombre obtenido por query. 

router.delete('/', async (req, res) => {
    const { name } = req.query;
    try {
      // Se llama al controlador deleteActivity pasando como parámetro el name de la Actividad 
      const isDeleted = await deleteActivity(name);
      if (isDeleted) {
        return res.status(200).json({ message: 'Delete Activity' });
      } else {
        return res.status(404).json({ message: 'Activity not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting activity' });
    }
  });
    
module.exports = router;