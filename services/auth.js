const { User } = require("../models/user/user");
const jwt = require("jsonwebtoken");

const findUserBy = async (data) => {
  const user = await User.findOne(data);
  return user;
};

const regUser = async ({ email, avatarURL, password, verificationToken }) => {
  const newUser = new User({ email, avatarURL, password, verificationToken });
  newUser.hashPassword(password);

  await newUser.save();
  return newUser;
};

const login = async (_id, token) => {
  await User.findByIdAndUpdate(_id, { token });
};

const createToken = ({ _id }) => {
  const { SECRET_KEY } = process.env;
  const playload = {
    id: _id,
  };

  const token = jwt.sign(playload, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const logout = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null });
};

const updateSubscription = async (_id, subscription) => {
  const subscriptionList = ["starter", "pro", "business"];

  if (!subscriptionList.includes(subscription)) {
    return false;
  }

  const updatedStatus = await User.findByIdAndUpdate(
    _id,
    { $set: { subscription } },
    { new: true, select: "_id email subscription" }
  );
  return updatedStatus;
};

const updateAvatar = async (_id, avatarURL) => {
  const updatedAvatar = await User.findByIdAndUpdate(_id, { avatarURL });
  return updatedAvatar;
};

const verifyUser = async (_id) => {
  await User.findByIdAndUpdate(_id, { verify: true, verificationToken: null });
};

module.exports = {
  findUserBy,
  regUser,
  login,
  createToken,
  logout,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
