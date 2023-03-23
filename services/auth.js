const { User } = require("../models/user/user");
const jwt = require("jsonwebtoken");

const findUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
};

const regUser = async ({ email, password }) => {
  const newUser = new User({ email, password });
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

module.exports = {
  findUserByEmail,
  regUser,
  login,
  createToken,
  logout,
  updateSubscription,
};
