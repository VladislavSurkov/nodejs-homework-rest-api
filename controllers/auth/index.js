const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrent } = require("./getCurrent");
const { logoutUser } = require("./logoutUser");
const { updateUserSubscription } = require("./updateUserSubscription");
const { updateUserAvatar } = require("./updateUserAvatar");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logoutUser,
  updateUserSubscription,
  updateUserAvatar,
};
