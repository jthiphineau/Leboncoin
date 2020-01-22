const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
    console.log(req.headers.authorization)

    if (req.headers.authorization) {
        const user = await User.findOne({
            token: req.headers.authorization.replace("Bearer ", "")
        });
        if (!user) {
            return res.json({
                error: "Unauthorized 1"
            });
        } else {
            req.user = user;
            next();
        }
    } else {
        return res.json({
            message: "Unauthorized 2"
        });
    }
};

module.exports = isAuthenticated;