var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment");

var data= [
    {
        name: "lake tahoe",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem "
        
    },
     {
        name: "lake george",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem "
        
    },
     {
        name: "lake michael",
        image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem "
        
    }
    ]

function seedDB(){
//REMOVE ALL CAMPGROUNDS    
    Campground.remove({}, function (err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
                //ADD CAMPGROUNDS
              data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    //ADD COMMENTS
                    console.log("campground added");
                    
                    Comment.create(
                        {
                            text: "This place is great, but its too cold and cloudy",
                            author: "Homer Simpson"
                            
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                            
                        })
                }
            })
        })
    
    });



}

module.exports = seedDB;