const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers/errorHandler");
const { createValid, updateValid } = require("../../models/contact/joiSchema");
const { auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

router.use(auth);

router.get("/", ctrlWrapper(ctrl.getContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", createValid, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", updateValid, ctrlWrapper(ctrl.updateContact));

router.patch("/:contactId/favorite" ,updateValid, ctrlWrapper(ctrl.updateStatus));

module.exports = router;
