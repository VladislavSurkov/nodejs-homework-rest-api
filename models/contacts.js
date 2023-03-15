const { Contact } = require("../db/contactModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  return contactById;
};

const addContact = async (body) => {
  const newContact = new Contact({ ...body });
  await newContact.save();
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await Contact.findByIdAndRemove(contactId);
  return contacts;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { ...body } },
    { new: true }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, { favorite }) => {
  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );
  return updatedStatus;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
