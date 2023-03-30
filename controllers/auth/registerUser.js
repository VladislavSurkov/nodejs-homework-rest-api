const gravatar = require("gravatar");
const { findUserByEmail, regUser } = require("../../services/auth");

const registerUser = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const avatarURL = gravatar.url(email);

  const user = await findUserByEmail({ email });

  user
    ? res.status(409).json({ message: "Email in use" })
    : await regUser({ email, avatarURL, password });
  
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = { registerUser };
