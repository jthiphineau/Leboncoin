const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


// const User = require("../models/User");
const Publish = require("../models/Publish");
const isAuthenticated = require("../middleware/isAuthenticated");


router.post("/offer/publish", isAuthenticated, async (req, res) => {
    // console.log(req.user)
    try {
        const newPublish = new Publish({
            publishId: req.fields.publishId,
            title: req.fields.title,
            description: req.fields.description,
            price: req.fields.price,
            // created: String,
            creator: req.fields.creator
        });
        await newPublish.save();
        res.json({
            message: "On est bien"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
module.exports = router;