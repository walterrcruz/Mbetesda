var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


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
router.get('/seminario', (req, res) => {
    res.render('informacion/vision')
})
router.get('/grupos', (req, res) => {
    res.render('informacion/grupos')
})
router.get('/desarrollo', (req, res) => {
    res.render('informacion/desarrollo')
})

module.exports = router