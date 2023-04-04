const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { updateAvatar } = require("../../services/auth");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const imgName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imgName);

    const originalAvatar = await Jimp.read(tempUpload);
    originalAvatar.resize(250, 250).write(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", imgName);

    await updateAvatar(_id, avatarURL);
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);

    throw error;
  }
};

module.exports = { updateUserAvatar };
