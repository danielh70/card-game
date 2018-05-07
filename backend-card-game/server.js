const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const passport = require("passport");

require("./userModel");
require("./config/passport");
const routes = require("./routes");

const app = express();
app.use(express.static(path.resolve(__dirname, '../card-game/build')));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/", routes);

app.use((err, req, res, next) => {
  res.status(500).json(err);
});


app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "../card-game/build", "index.html"));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});