const { Contact } = require("../models/contact/contact");

const listContacts = async (owner, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const checkFavorite = {...(favorite === undefined ? { owner } : { owner, favorite })};

  const contacts = await Contact.find(checkFavorite, " ", {
    skip,
    limit: +limit,
  }).populate("owner", "_id email subscription");
  return contacts;
};

const ContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  return contactById;
};

const addNewContact = async (body, owner) => {
  const newContact = new Contact({ ...body, owner });
  await newContact.save();
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await Contact.findByIdAndRemove(contactId);
  return contacts;
};

const changeContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { ...body } },
    { new: true }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, favorite) => {
  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );
  return updatedStatus;
};

module.exports = {
  listContacts,
  ContactById,
  removeContact,
  addNewContact,
  changeContact,
  updateStatusContact,
};
