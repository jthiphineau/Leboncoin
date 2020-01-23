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
        const obj = {
            title: req.fields.title,
            description: req.fields.description,
            price: req.fields.price,
            creator: req.user
        };

        const newOffer = new Offer(obj);
        await newOffer.save();
        res.json({
            _id: newOffer._id,
            title: newOffer.title,
            description: newOffer.description,
            price: newOffer.price,
            created: newOffer.created,
            creator: {
                account: newOffer.creator.account,
                _id: newOffer.creator._id
            }
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});

module.exports = router;