var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    // Campground = require("./models/campground"),
    Sermon = require("./models/sermon"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");


var commentRoutes = require("./routes/comments"),
    // campgroundRoutes = require("./routes/campgrounds"),
    serieRoutes = require("./routes/serie"),
    indexRoutes = require("./routes/index"),
    informacionRoutes = require("./routes/informacion")
    // mainRoutes = require("./routes/main"),
app.locals.des = require("./betesda.json");


const port = process.env.PORT || 3000;
// mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/betesda", { useMongoClient: true });
mongoose.connect("mongodb://adminBetesda:Trigger88@ds149335.mlab.com:49335/betesda", { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());



// seedDB();  //SEED THE DATABASE


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again im in",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/serie", serieRoutes);
app.use("/informacion", informacionRoutes);
app.use("/serie/:id/comments", commentRoutes);

app.listen(port, () => {
    console.log("iniciar en puerto: " + port);

});