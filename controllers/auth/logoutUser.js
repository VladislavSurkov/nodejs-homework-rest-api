const { logout } = require("../../services/auth");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json();
};

module.exports = { logoutUser };
