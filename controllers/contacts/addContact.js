const { addNewContact } = require("../../services/contacts");

const addContact = async (req, res, next) => {
  const contact = req.body;
  const { _id } = req.user;

  const newContact = await addNewContact(contact, _id);
  res.status(201).json(newContact);
};

module.exports = { addContact };
