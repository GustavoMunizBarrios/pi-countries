const { Router } = require("express");

const countries = require('./countries')
const activities = require('./activities')

const router = Router()

router.use('/countries', countries) 
router.use('/activities', activities)

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
module.exports = router;
