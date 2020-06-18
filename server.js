const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const tweetRoute = require("./routes/tweet");

require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files of React app from client/build folder
app.use(express.static(path.join(__dirname, "client", "build")))
app.use("/tweets", tweetRoute);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/twitter", { useMongoClient: true }, (err) => {
    if (err) console.error(err);
});

// serve index.html on GET requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
    console.log("Listening on " + port);
});


