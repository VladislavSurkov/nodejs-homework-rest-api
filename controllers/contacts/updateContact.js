const { changeContact } = require("../../services/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = req.body;
  const updatedContact = await changeContact(contactId, contact);

  updatedContact
    ? res.json(updatedContact)
    : res.status(404).json({ massage: "Not found" });
};

module.exports = { updateContact };
