const { findUserBy, verifyUser } = require("../../services/auth");

const verificationEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await findUserBy({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await verifyUser(user._id);
  res.json({ message: "Verification successful" });
};

module.exports = { verificationEmail };
