const { findUserBy, login, createToken } = require("../../services/auth");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserBy({ email });

  if (!user || !user.comparePassword(password)) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(401).json({ message: "Email is not verify" });
  }

  const token = await createToken(user);
  await login(user._id, token);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = { loginUser };
