var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


//ROOT ROUTE
router.get("/", function(req, res) {
    res.render("home.ejs");
});

//SHOW REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register");
});
//SIGN UP LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to Ministerios Betesda " + user.username);
            res.redirect("/serie");
        })
    })
})


//SHOW LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
})


//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/serie",
    failureRedirect: "/login"
}), function(req, res) {

})

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/serie")
})

//menu routes

router.get('/desarrollo', (req, res) => {
    res.render('desarrollo')
})
router.get('/sermones', (req, res) => {
    res.render('sermones')
})

module.exports = router