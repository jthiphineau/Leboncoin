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

//fonction createFilter
const createFilters = req => {

    const filters = {};

    if (req.query.priceMin) {
        filters.price = {};
        filters.price.$gte = req.query.priceMin;
    }
    if (req.query.priceMax) {
        if (filters.price === undefined) {
            filters.price = {};
        }
        filters.price.$lte = req.query.priceMax;
    }
    if (req.query.title) {
        filters.title = new RegExp(req.query.title, "i");
    }

    return filters;
};

router.post("/offer/with-count", async (req, res) => {
    const filters = createFilters(req);
    const search = Offer.find(filters);
    //classer en ordre croissant/décroissant les prix
    if (req.query.sort === "price-asc") {
        search.sort({
            price: 1
        });
    } else if (req.query.sort === "price-desc") {
        search.sort({
            price: -1
        });
    }
    //classer en ordre croissant/décroissant les dates
    if (req.query.sort === "date-asc") {
        search.sort({
            date: 1
        });
    } else if (req.query.sort === "date-desc") {
        search.sort({
            date: -1
        });
    }

    const offers = await search;
    res.json(offers);
});
module.exports = router;