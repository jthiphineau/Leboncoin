const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
    publishId: String,
    title: String,
    description: String,
    price: Number,
    created: String,
    creator: {
        account: {
            username: String,
        },
        userId: String
    }



});
module.exports = Offer;