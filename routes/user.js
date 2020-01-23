const express = require("express");
const router = express.Router();
//authentication
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-Base64");

//route user
const User = require("../models/User");

router.post("/user/sign_up", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.fields.email
        });
        if (user) {
            res.json({
                message: "This email already has an account"
            });
        } else {
            if (req.fields.email && req.fields.username && req.fields.password) {
                const salt = uid2(64);
                const hash = SHA256(req.fields.password + salt).toString(encBase64);
                const token = uid2(64);


                const newUser = new User({
                    email: req.fields.email,
                    token: token,
                    hash: hash,
                    salt: salt,
                    account: {
                        username: req.fields.username,
                        phone: req.fields.phone
                    }
                });
                await newUser.save();
                res.json({
                    _id: newUser._id,
                    token: newUser.token,
                    account: {
                        username: req.fields.username,
                        phone: req.fields.phone
                        //ou account: newUser.account
                    }
                });
            } else {
                res.json({
                    message: "Missing parameter(s)"
                });
            }
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
});

router.post("/user/log_in", async (req, res) => {

    // console.log(req.fields.password);
    try {
        const user = await User.findOne({
            email: req.fields.email
        });
        if (user) {
            // console.log("coucou");

            // console.log("hash login ====", SHA256(req.fields.password + user.salt).toString(encBase64));
            // console.log("user.hash =====", user.hash)
            if (
                SHA256(req.fields.password + user.salt).toString(encBase64) === user.hash
            ) {
                res.json({
                    _id: user._id,
                    token: user.token,
                    account: user.account
                });
            } else {
                res.json({
                    message: "Try again"
                });
            }
        } else {
            res.json({
                message: "User not found"
            });

        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
});

module.exports = router;