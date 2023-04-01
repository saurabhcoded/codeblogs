const slugify = require("slugify");
const SERVICE = require("../../models/service");

const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");
const getServices = async (req, res) => {
  try {
    const result = await SERVICE.find();
    res.status(200).json({ result });
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const postServices = async (req, res) => {
  const img = imgUrl(req.file);
  const { title, content } = req.body;
  try {
    if (title && content && img) {
      const body = {
        title,
        slug: slugify(title).toLowerCase(),
        img,
        content,
      };
      const newService = await (await SERVICE.create(body)).save();
      clog.info(newService);
      res.status(200).json({ message: "Service Added Succesfully", result: newService });
    } else {
      res.status(404).json({ message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateServices = async (req, res) => {
  const { title, content, img, icon } = req.body;
  const { id } = req.query;
  clog.info(req.body);
  try {
    if (id) {
      const updateService = await SERVICE.findByIdAndUpdate(id, {
        title: title,
        slug: slugify(String(title)).toLowerCase(),
        content,
        img,
        icon,
      });
      res.status(200).json({ message: "Updated Successfully", result: updateService });
    } else {
      res.status(404).json({ message: "Service ID not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteServices = async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const deleteService = await SERVICE.deleteOne({ _id: id });
      if (deleteService?.deletedCount) {
        res.status(200).json({ message: "Service Deleted Succesfully" });
      } else {
        res.status(404).json({ message: "Service Not Found" });
      }
    } else {
      res.status(404).json({ message: "Id not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleService = async (req, res) => {
  const slug = req.params.slug;
  clog.info(slug);
  try {
    if (slug) {
      const result = await SERVICE.findOne({ slug: slug });
      if (result) {
        res.status(200).json({ message: "Service Found Successfully", result });
      } else {
        res.status(404).json({ message: "Service Not Found" });
      }
    } else {
      res.status(404).json({ message: "Service ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getServices,
  postServices,
  updateServices,
  deleteServices,
  getSingleService,
};
