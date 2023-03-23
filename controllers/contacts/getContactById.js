const { ContactById } = require("../../services/contacts");

const getContactById = async (req, res, next) => {
  const contactById = await ContactById(req.params.contactId);

  contactById
    ? res.json(contactById)
    : res.status(404).json({ massage: "Not found" });
};

module.exports = { getContactById };
