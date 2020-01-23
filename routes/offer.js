const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


// const User = require("../models/User");
const Offer = require("../models/Offer");
const isAuthenticated = require("../middleware/isAuthenticated");


router.post("/offer/publish", isAuthenticated, async (req, res) => {
    // console.log(req.user)
    try {
        const newOffer = new Offer({
            publishId: req.fields.publishId,
            title: req.fields.title,
            description: req.fields.description,
            price: req.fields.price,
            // created: String,
            creator: req.fields.creator
        });
        await newOffer.save();
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