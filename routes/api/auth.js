const express = require("express");
const router = express.Router();
const { userValid, verifyValid } = require("../../models/user/joiShema");
const { ctrlWrapper } = require("../../helpers/errorHandler");
const { auth: ctrl } = require("../../controllers");
const { auth, upload } = require("../../middlewares");

router.post("/register", userValid, ctrlWrapper(ctrl.registerUser));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verificationEmail));

router.post("/verify", verifyValid, ctrlWrapper(ctrl.verifyRepeat));

router.post("/login", userValid, ctrlWrapper(ctrl.loginUser));

router.use(auth)

router.post("/current", ctrlWrapper(ctrl.getCurrent));

router.patch("/", ctrlWrapper(ctrl.updateUserSubscription));

router.patch("/avatars", upload.single('avatar'),  ctrlWrapper(ctrl.updateUserAvatar));

router.post("/logout",  ctrlWrapper(ctrl.logoutUser));


module.exports = router;
