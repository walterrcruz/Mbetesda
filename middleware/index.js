var Sermon = require("../models/sermon")
var Comment = require("../models/comment")


//ALL MIDDLEWARE GOES HERE

//CAMPGROUNDS MIDDLEWARE
var middlewareObj = {};

middlewareObj.checkSermonOwnership = function(req, res, next) {
        if (req.isAuthenticated()) {
            Sermon.findById(req.params.id, function(err, foundSermon) {
                if (err) {
                    req.flash("error", "Serie no esta disponible");
                    res.redirect("back")
                } else {
                    //DOES USER OWN THE CAMPGROUND?
                    if (foundSermon.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You need permission for this action");
                        res.redirect("back");
                    }

                }
            })
        } else {
            req.flash("error", "Please Login to do that")
            res.redirect("back");
        }
    }
    //COMMENTS MIDDLEWARE

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                //DOES USER OWN THE Comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }

            }
        })
    } else {
        req.flash("error", "You need to be logged in for access");
        res.redirect("back");
    }
}

//IS LOGGED IN AUTH
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login or create an account to have those privileges!!");
    res.redirect("/login");
}




module.exports = middlewareObj