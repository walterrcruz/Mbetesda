var express = require("express");
var router = express.Router({ mergeParams: true });
var Sermon = require("../models/sermon");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//======================================
//COMMENTS new
//======================================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    //FIND Sermon BY ID
    Sermon.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { comments: comment });
        }
    })

})


//COMMENTS CREATE

router.post("/", middleware.isLoggedIn, function(req, res) {
    //LOOKUP CAMPGROUNDS USING ID
    Sermon.findById(req.params.id, function(err, comments) {
        if (err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("/serie");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //ADD USERNAME AND ID TO COMMENT
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    //SAVE COMMENT
                    comment.save();
                    comments.comments.push(comment);
                    comments.save();
                    req.flash("success", "Comment successfully added!!");
                    res.redirect('/serie/' + comments._id);
                }
            })
        }
    })

})

//COMMENTS EDIT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    })

})

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/serie/" + req.params.id);
        }
    })
})


//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //FIND BY ID AND REMOVE
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back")
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/serie/" + req.params.id);
        }
    })
})



module.exports = router