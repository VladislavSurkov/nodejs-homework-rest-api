const express = require("express");
const router = express.Router();

const { schemaCreate, schemaUptade } = require("../../chemas/joiSchema");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: `${err.massage}` });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);

    contactById
      ? res.json(contactById)
      : res.status(404).json({ massage: "Not found" });
  } catch (err) {
    res.status(500).json({ message: `${err.massage}` });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaCreate.validate(req.body);
    if (error) {
      return res.status(500).json({ message: "Missing required name field" });
    }

    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });

    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: `${err.massage}` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId);

    contacts
      ? res.json({ message: "contact deleted" })
      : res.status(404).json({ massage: "Not found" });
  } catch (err) {
    res.status(500).json({ message: `${err.massage}` });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaUptade.validate(req.body);
    if (error) {
      return res.status(500).json({ message: "Missing fields" });
    }

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
    res.status(500).json({ message: `${err.massage}` });
  }
});

module.exports = router;
