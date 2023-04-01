const multer = require("multer");
const slugify = require("slugify");
const { uid } = require("uid");
const fs = require("fs");
const clog = require("./chalk");
const slugOptions = {
  replacement: "-",
  remove: undefined,
  lower: true,
  strict: false,
  locale: "vi",
  trim: true,
};
const upload = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      let internalFolder = req.baseUrl.split("/")[2];
      let DestDir;
      if (internalFolder) {
        DestDir = "uploads/" + internalFolder;
      } else {
        DestDir = "uploads/";
      }
      let CheckDir = fs.existsSync(DestDir);
      switch (CheckDir) {
        case true:
          cb(null, DestDir);
          break;
        case false:
          if (fs.mkdirSync(DestDir)) {
            cb(null, DestDir);
          }
          break;
      }
    },
    filename: function (req, file, cb) {
      cb(null, `${uid(4) + slugify(file.originalname, slugOptions)}`);
    },
  }),
});
const imgUrl = (file) => {
  if (file) {
    const baseUrl = process.env.ADMIN_URL;
    let imgLink = baseUrl + file.path;
    imgLink = imgLink.replaceAll("\\", "/");
    return imgLink;
  } else {
    clog.error("no file is provided");
    return false;
  }
};
module.exports = upload;
module.exports.imgUrl = imgUrl;
