const { updateStatusContact } = require("../../services/contacts");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: `Missing field favorite` });
  }

  const updatedStatus = await updateStatusContact(contactId, favorite);
  updatedStatus
    ? res.json(updatedStatus)
    : res.status(404).json({ message: `Not found` });
};

module.exports = { updateStatus };
