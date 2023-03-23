const { getContacts } = require("./getContacts");
const { getContactById } = require("./getContactById");
const { deleteContact } = require("./deleteContact");
const { addContact } = require("./addContact");
const { updateContact } = require("./updateContact");
const { updateStatus } = require("./updateStatus");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatus,
};
