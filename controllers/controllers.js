const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const { ServerError } = require("../helpers/error");

const getContactController = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);

  contactById
    ? res.json(contactById)
    : res.status(404).json({ massage: "Not found" });
};

const addContactControler = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await addContact({ name, email, phone, favorite });

  res.status(201).json(newContact);
};

const deleteContactControler = async (req, res, next) => {
  const contacts = await removeContact(req.params.contactId);

  contacts
    ? res.json({ message: "contact deleted" })
    : res.status(404).json({ massage: "Not found" });
};

const updateContactsControler = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await updateContact(contactId, {
    name,
    email,
    phone,
  });

  updatedContact
    ? res.json(updatedContact)
    : res.status(404).json({ massage: "Not found" });
};

const updateStatusControler = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw new ServerError("missing field favorite", 400);
  }

  const updatedStatus = await updateStatusContact(contactId, { favorite });

  updatedStatus
    ? res.json(updatedStatus)
    : res.status(404).json({ message: `Not found` });
};

module.exports = {
  getContactController,
  getContactByIdController,
  addContactControler,
  deleteContactControler,
  updateContactsControler,
  updateStatusControler,
};
