var mongoose = require("mongoose");


//schema setup
var gruposSchema = new mongoose.Schema({
    title: String,
    serie: String,
    video: String,
    date: { type: Date, default: Date.now },
    predicador: String,
    categoria: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

//model

module.exports = mongoose.model("Grupos", gruposSchema);