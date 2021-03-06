const mongoose = require("mongoose");
//modèle Offer
const Offer = mongoose.model("Offer", {
    title: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 500,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        max: 10000
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }



});
module.exports = Offer;