const { findUserByEmail, regUser } = require("../../services/auth");

const registerUser = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await findUserByEmail({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }

  await regUser({ email, password });
  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = { registerUser };
