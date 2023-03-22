const { listContacts } = require("../../services/contacts");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  
  const contacts = await listContacts(_id, page, limit, favorite);
  res.json(contacts);
};

module.exports = { getContacts };
