const TECH = require("../../models/tech");
const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");

const getTechs = async (req, res) => {
  try {
    const result = await TECH.find();
    res.status(200).json({ result });
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const postTechs = async (req, res) => {
  const icon = imgUrl(req.file);
  const { name } = req.body;
  try {
    if (name && icon) {
      const body = { name, icon };
      const newTECH = await (await TECH.create(body)).save();
      clog.info(newTECH);
      res.status(200).json({ message: "TECH Added Succesfully", result: newTECH });
    } else {
      res.status(404).json({ message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateTechs = async (req, res) => {
  const { name } = req.body;
  const icon = imgUrl(req.file);
  const { id } = req.query;
  try {
    if (id) {
      const updateTECH = await TECH.findByIdAndUpdate(id, { name, icon });
      if (updateTECH) {
        res.status(200).json({ message: "Updated Successfully", result: updateTECH });
      } else {
        res.status(404).json({ message: "TECH not Found" });
      }
    } else {
      res.status(404).json({ message: "TECH ID not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteTechs = async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const deleteTECH = await TECH.deleteOne({ _id: id });
      if (deleteTECH?.deletedCount) {
        res.status(200).json({ message: "TECH Deleted Succesfully" });
      } else {
        res.status(404).json({ message: "TECH Not Found" });
      }
    } else {
      res.status(404).json({ message: "Id not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleTech = async (req, res) => {
  const slug = req.params.slug;
  try {
    if (slug) {
      const result = await TECH.findOne({ _id: slug });
      if (result) {
        res.status(200).json({ message: "TECH Found Successfully", result });
      } else {
        res.status(404).json({ message: "TECH Not Found" });
      }
    } else {
      res.status(404).json({ message: "TECH ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTechs,
  postTechs,
  updateTechs,
  deleteTechs,
  getSingleTech,
};
