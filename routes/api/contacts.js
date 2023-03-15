const express = require("express");
const router = express.Router();

const {
  createValidation,
  updateValidation,
} = require("../../chemas/joiSchema");
const { controllerWrapper } = require("../../helpers/errorHandler");
const {
  getContactController,
  getContactByIdController,
  addContactControler,
  deleteContactControler,
  updateContactsControler,
  updateStatusControler,
} = require("../../controllers/controllers");

router.get("/", controllerWrapper(getContactController));

router.get("/:contactId", controllerWrapper(getContactByIdController));

router.post("/", createValidation, controllerWrapper(addContactControler));

router.delete("/:contactId", controllerWrapper(deleteContactControler));

router.put(
  "/:contactId",
  updateValidation,
  controllerWrapper(updateContactsControler)
);

router.patch(
  "/:contactId/favorite",
  updateValidation,
  controllerWrapper(updateStatusControler)
);

module.exports = router;
