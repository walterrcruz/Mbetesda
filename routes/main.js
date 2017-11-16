var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/informacion', (req, res) => {
    res.render('informacion/informacion')
})


router.get('/seminario', (req, res) => {
    res.render('informacion/seminario')
})

router.get('/desarrollo', (req, res) => {
    res.render('desarrollo')
})
router.get('/sermones', (req, res) => {
    res.render('sermones')
})
module.exports = router;