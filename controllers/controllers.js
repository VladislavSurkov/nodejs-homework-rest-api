const {
  listContacts,
  getContactById,
  addContact,
    removeContact,
    updateContact,
} = require("../models/contacts");

const { ServerError } = require("../helpers/error");

const getContactController = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    throw new ServerError(`${err.message}`, 500);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);

    contactById
      ? res.json(contactById)
      : res.status(404).json({ massage: "Not found" });
  } catch (err) {}
};

const addContactControler = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });

    res.status(201).json(newContact);
  } catch (err) {
  }
};

const deleteContactControler = async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId);

    contacts
      ? res.json({ message: "contact deleted" })
      : res.status(404).json({ massage: "Not found" });
  } catch (err) {
  }
};

const updateContactsControler = async (req, res, next) => {
  try {
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
  } catch (err) {
  }
};

module.exports = {
  getContactController,
  getContactByIdController,
  addContactControler,
  deleteContactControler,
  updateContactsControler,
};
