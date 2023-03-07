const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, " "));
  return newContact;
};

const removeContact = async (contactId) => {
  const contactById = await getContactById(contactId);
  const contacts = await listContacts();

  const deleteContact = contacts.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, " "));
  return contactById;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const updatedContact = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...body } : contact
  );
  fs.writeFile(contactsPath, JSON.stringify(updatedContact, null, " "));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
