//serveur
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());
//authentication



const userRoutes = require("./routes/user");
app.use(userRoutes);
const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

mongoose.connect("mongodb://localhost/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to leboncoin API"
    });
});

app.all("*", function (req, res) {
    res.send("Page not found");
});

app.listen(3000, () => {
    console.log("server has started");
});