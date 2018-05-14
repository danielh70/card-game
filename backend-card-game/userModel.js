const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoDB = 'mongodb://localhost/card-games';
const jwt_secret = 'secrettt';

// 'mongodb://heroku_tr8ltrqs:h0usa97lajqf0akarnffkcss4p@ds217310.mlab.com:17310/heroku_tr8ltrqs'

mongoose.connect(process.env.MONGODB_URI || mongoDB);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Required!"],
    validate: [validateEmail, "Invalid address!"],
    maxlength: [50, "Too Long!"],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, "Required!"],
    maxlength: [50, "Too Long!"],
    trim: true
  },
  hash: String,
  salt: String,
  pushTokenId: String,
  chips: Number
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    jwt_secret
  );
};

mongoose.model("User", userSchema);