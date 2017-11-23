var express = require("express");
var router = express.Router();
var Sermon = require("../models/sermon");
var middleware = require("../middleware");


//INDEX-SHOW ALL CAMPGROUNDS

router.get("/", function(req, res) {

    //GET ALL CAMPGROUNDS FROM DB   
    Sermon.find({}, function(err, allSermon) {
        if (err) {
            console.log(err);
        } else {
            res.render("series/serie", { serie: allSermon, currentUser: req.user });
        }
    });


});

//CREATE ROUTE-add newcampground TO DB

router.post("/", middleware.isLoggedIn, function(req, res) {

    //get data from form and add to array
    //post

    var title = req.body.title;
    var serie = req.body.serie;
    var video = req.body.video;
    var predicador = req.body.predicador;
    var image = req.body.image;
    var categoria = req.body.categoria;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSermon = { title: title, serie: serie, video: video, predicador: predicador, image: image, categoria: categoria, description: description, author: author };


    //create a new campground and save to db
    Sermon.create(newSermon, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds
            res.redirect("/serie");
        }
    });

});

//NEW ROUTE- show form to create new campground

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("series/new");
})

//SHOW ROUTE-show more info about one campground

router.get("/:id", function(req, res) {
    //Find campground provided 
    Sermon.findById(req.params.id).populate("comments").exec(function(err, foundSermon) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundSermon);
            //Render show page teamplate
            res.render("series/show", { showSermon: foundSermon });
        }
    })
});

//EDIT CAMPGROUNDS
router.get("/:id/edit", middleware.checkSermonOwnership, function(req, res) {
    //IS USER LOGGED IN
    Sermon.findById(req.params.id, function(err, foundSermon) {
        res.render("series/edit", { sermon: foundSermon });
    });
});
//UPDATE CAMPGROUNDS
router.put("/:id", middleware.checkSermonOwnership, function(req, res) {
    //FIND AND UPDATE
    Sermon.findByIdAndUpdate(req.params.id, req.body.editSermon, function(err, updatedSermon) {
        if (err) {
            res.redirect("/serie");
        } else {
            //REDIRECT SOMEWHERE (SHOW PAGE)
            res.redirect("/serie/" + req.params.id);
            console.log(updatedSermon)
        }
    })

})

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkSermonOwnership, function(req, res) {
    Sermon.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/serie");
        } else {
            res.redirect("/serie");
        }
    })
})


module.exports = router;