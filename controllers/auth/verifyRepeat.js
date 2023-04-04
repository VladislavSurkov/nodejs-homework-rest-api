const { sendMail } = require("../../helpers/sendMail");
const { findUserBy } = require("../../services/auth");

const verifyRepeat = async (req, res) => {
  const { email } = req.body;
  const user = await findUserBy({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  sendMail(email, user.verificationToken);
  res.json({ message: "Verification email sent" });
};

module.exports = { verifyRepeat };
