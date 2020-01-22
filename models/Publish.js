const mongoose = require("mongoose");

const Publish = mongoose.model("Publish", {
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
module.exports = Publish;