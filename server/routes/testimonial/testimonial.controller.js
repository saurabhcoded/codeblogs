const TESTIMONIAL = require("../../models/testimonial");
const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");

const getTestimonials = async (req, res) => {
  try {
    const result = await TESTIMONIAL.find();
    res.status(200).json({ result });
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const postTestimonials = async (req, res) => {
  const profile = imgUrl(req.file);
  const { name, company, description } = req.body;
  try {
    if (name && company && description && profile) {
      const body = { name, profile, company, description };
      const newTESTIMONIAL = await (await TESTIMONIAL.create(body)).save();
      clog.info(newTESTIMONIAL);
      res.status(200).json({ message: "TESTIMONIAL Added Succesfully", result: newTESTIMONIAL });
    } else {
      res.status(404).json({ message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateTestimonials = async (req, res) => {
  const { name, company, description } = req.body;
  const profile = imgUrl(req.file);
  const { id } = req.query;
  clog.info(req.body);
  try {
    if (id) {
      const updateTESTIMONIAL = await TESTIMONIAL.findByIdAndUpdate(id, { name, profile, company, description });
      if (updateTESTIMONIAL) {
        res.status(200).json({ message: "Updated Successfully", result: updateTESTIMONIAL });
      } else {
        res.status(404).json({ message: "TESTIMONIAL not Found" });
      }
    } else {
      res.status(404).json({ message: "TESTIMONIAL ID not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteTestimonials = async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const deleteTESTIMONIAL = await TESTIMONIAL.deleteOne({ _id: id });
      if (deleteTESTIMONIAL?.deletedCount) {
        res.status(200).json({ message: "TESTIMONIAL Deleted Succesfully" });
      } else {
        res.status(404).json({ message: "TESTIMONIAL Not Found" });
      }
    } else {
      res.status(404).json({ message: "Id not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleTestimonial = async (req, res) => {
  const slug = req.params.slug;
  clog.info(slug);
  try {
    if (slug) {
      const result = await TESTIMONIAL.findOne({ _id: slug });
      if (result) {
        res.status(200).json({ message: "TESTIMONIAL Found Successfully", result });
      } else {
        res.status(404).json({ message: "TESTIMONIAL Not Found" });
      }
    } else {
      res.status(404).json({ message: "TESTIMONIAL ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTestimonials,
  postTestimonials,
  updateTestimonials,
  deleteTestimonials,
  getSingleTestimonial,
};
