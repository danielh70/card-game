require("dotenv").config();
// const FB_APP_ID = process.env.FB_APP_ID;
// const FB_SECRET = process.env.FB_SECRET;
// const GO_APP_ID = process.env.GO_APP_ID;
// const GO_SECRET = process.env.GO_SECRET;

const FB_APP_ID = 'secret';
const FB_SECRET = 'secret';
const GO_APP_ID = 'secret';
const GO_SECRET = 'secret';

module.exports = {
  facebookAuth: {
    appID: FB_APP_ID,
    appSecret: FB_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  googleAuth: {
    appID: GO_APP_ID,
    appSecret: GO_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }
};