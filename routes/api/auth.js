const express = require("express");
const router = express.Router();
const { userValid } = require("../../models/user/joiShema");
const { ctrlWrapper } = require("../../helpers/errorHandler");
const { auth: ctrl } = require("../../controllers");
const { auth } = require("../../middlewares/auth");

router.post("/register", userValid, ctrlWrapper(ctrl.registerUser));

router.post("/login", userValid, ctrlWrapper(ctrl.loginUser));

router.use(auth)

router.post("/current", ctrlWrapper(ctrl.getCurrent));

router.patch("/", ctrlWrapper(ctrl.updateUserSubscription));

router.post("/logout",  ctrlWrapper(ctrl.logoutUser));


module.exports = router;
