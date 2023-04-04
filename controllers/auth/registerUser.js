const { findUserBy, regUser } = require("../../services/auth");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendMail } = require("../../helpers/sendMail");

const registerUser = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const user = await findUserBy({ email });

  user
    ? res.status(409).json({ message: "Email in use" })
    : await regUser({ email, avatarURL, password, verificationToken });

  await sendMail(email, verificationToken);

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = { registerUser };
