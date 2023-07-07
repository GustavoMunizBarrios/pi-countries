const { Activity} = require('../src/db');

//Borrar una actividad
const deleteActivity = async (name) => { //nombre de la actividad a eliminar
  try {
    //findOne busca una actividad en la DB que tenga el nombre proporcionado (name).
    const activity = await Activity.findOne({ where: { name } });

    if (!activity) { //si no encontro ninguna actividad devuelve false
      return false; 
    }
    // desvincula la actividad de todos los países relacionados
    await activity.setCountries([]);
    // elimina la actividad
    await activity.destroy();
    return true; 

  } catch (error) {
    console.log('Error deleting activity', error);
  }
};

module.exports = deleteActivity;