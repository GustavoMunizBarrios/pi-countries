const { Router } = require("express");
const path = require('path');

const countries = require('./countries')
const activities = require('./activities')

const router = Router()

// Sirve tus archivos estáticos
router.use(express.static(path.join(__dirname, 'dist')));

// Maneja tus rutas aquí, coloca todos los puntos finales de la API antes de esto.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.use('/countries', countries) 
router.use('/activities', activities)

module.exports = router;
