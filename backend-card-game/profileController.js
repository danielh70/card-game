const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.secret = (req, res) => {
  if (req.payload._id !== req.params.uid) {
    res.status(401).json({
      code: "You are spoofing!"
    });
  } else {
    res.status(200).json({
      code: "You're awesome"
    });
  }
};

module.exports.getChips = (req, res) => {
  console.log(req.body);
  const { _id } = req.body

  User.findById({ _id: _id })
    .then(function(user) {
      res.json({ user: user })

      console.log("found user", user);
  })
}

module.exports.adjustChips = async (req, res) => {
  console.log("req body...", req.body);
  const { _id, chips } = req.body

  User.findByIdAndUpdate({ _id: _id })
    .then(function(user) {
      user.chips = chips;
      res.json({ user: user })

      user.save();
  })
}

module.exports.resetChips = async (req, res) => {
  console.log("req body...", req.body);
  const { _id, chips } = req.body

  User.findByIdAndUpdate({ _id: _id })
    .then(function(user) {
      user.chips = 500;
      res.json({ user: user })

      user.save();
  })
}

module.exports.addPushNotificationId = async (req, res) => {
  const { uid, token } = req.body;
  try {
    await User.findByIdAndUpdate(uid, { $set: { pushTokenId: token } });
    res.json("success!");
  } catch (e) {
    res.json(e);
  }
};

module.exports.sendPushNotifications = (req, res) => {
  const somePushTokens = ["ExponentPushToken[ZkmuQHAXHp1_mt-mqRDaYh]"];
  let messages = [];
  const { title, body } = req.body;

  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: "default",
      title,
      body,
      data: { title, body }
    });
  }
  let chunks = expo.chunkPushNotifications(messages);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
  res.json("success!");
};