const { updateSubscription } = require("../../services/auth");

const updateUserSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(400).json({ message: `Missing field subscription` });
  }

  const updatedSubscription = await updateSubscription(_id, subscription);
  updatedSubscription
    ? res.json(updatedSubscription)
    : res.status(404).json({ message: `Not found` });
};

module.exports = { updateUserSubscription };
