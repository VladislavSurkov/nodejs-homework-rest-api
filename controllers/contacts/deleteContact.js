const { removeContact } = require("../../services/contacts");

const deleteContact = async (req, res, next) => {
  const contacts = await removeContact(req.params.contactId);

  contacts
    ? res.json({ message: "contact deleted" })
    : res.status(404).json({ massage: "Not found" });
};

module.exports = { deleteContact };
