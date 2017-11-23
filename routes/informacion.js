var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var Grupos = require("../models/grupos");

router.get('/', (req, res) => {
    res.render('informacion/informacion')
})

router.get('/seminario', (req, res) => {
    res.render('informacion/seminario')
})
router.get('/fe', (req, res) => {
    res.render('informacion/fe')
})
router.get('/historia', (req, res) => {
    res.render('informacion/historia')
})
router.get('/valores', (req, res) => {
    res.render('informacion/valores')
})
router.get('/vision', (req, res) => {
    res.render('informacion/vision')
})

///////////////new groups..///
router.get('/grupos', (req, res) => {
    Grupos.find({}, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('informacion/grupos', { grupos: result })
        }
    })
})
router.post('/grupos', (req, res) => {
        var title = req.body.title;
        var anfitrion = req.body.title;

    })
    ///////end groups

router.get('/desarrollo', (req, res) => {
    res.render('informacion/desarrollo')
})

module.exports = router