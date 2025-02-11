const { User } = require("../models/user/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { SECRET_KEY } = process.env;

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };