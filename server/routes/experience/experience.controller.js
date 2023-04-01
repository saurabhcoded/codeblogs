const EXPERIENCE = require("../../models/experience");

const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");
const getExperiences = async (req, res) => {
  try {
    const result = await EXPERIENCE.find();
    res.status(200).json({ result });
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const postExperiences = async (req, res) => {
  const { role, company, location, bgcolor, color, date, description } = req.body;
  try {
    if (role && company && location && bgcolor && color && date && description) {
      const body = {
        role,
        company,
        location,
        bgcolor,
        color,
        date,
        description,
      };
      const newEXPERIENCE = await (await EXPERIENCE.create(body)).save();
      clog.info(newEXPERIENCE);
      res.status(200).json({ message: "EXPERIENCE Added Succesfully", result: newEXPERIENCE });
    } else {
      res.status(404).json({ message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateExperiences = async (req, res) => {
  const { role, company, location, bgcolor, color, date, description } = req.body;
  const { id } = req.query;
  clog.info(req.body);
  try {
    if (id) {
      const updateEXPERIENCE = await EXPERIENCE.findByIdAndUpdate(id, {
        role,
        company,
        location,
        bgcolor,
        color,
        date,
        description,
      });
      if (updateEXPERIENCE) {
        res.status(200).json({ message: "Updated Successfully", result: updateEXPERIENCE });
      } else {
        res.status(404).json({ message: "EXPERIENCE not Found" });
      }
    } else {
      res.status(404).json({ message: "EXPERIENCE ID not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteExperiences = async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const deleteEXPERIENCE = await EXPERIENCE.deleteOne({ _id: id });
      if (deleteEXPERIENCE?.deletedCount) {
        res.status(200).json({ message: "EXPERIENCE Deleted Succesfully" });
      } else {
        res.status(404).json({ message: "EXPERIENCE Not Found" });
      }
    } else {
      res.status(404).json({ message: "Id not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleExperience = async (req, res) => {
  const slug = req.params.slug;
  clog.info(slug);
  try {
    if (slug) {
      const result = await EXPERIENCE.findOne({ _id: slug });
      if (result) {
        res.status(200).json({ message: "EXPERIENCE Found Successfully", result });
      } else {
        res.status(404).json({ message: "EXPERIENCE Not Found" });
      }
    } else {
      res.status(404).json({ message: "EXPERIENCE ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getExperiences,
  postExperiences,
  updateExperiences,
  deleteExperiences,
  getSingleExperience,
};
