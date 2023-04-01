const slugify = require("slugify");
const PROJECT = require("../../models/project");

const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");

const getProjects = async (req, res) => {
  try {
    const result = await PROJECT.find().populate("tech");
    res.status(200).json({ result });
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const postProjects = async (req, res) => {
  const img = imgUrl(req.file);
  const { title, content, tech } = req.body;
  try {
    if (title && content && img && tech) {
      const body = {
        title,
        slug: slugify(title).toLowerCase(),
        img,
        tech,
        content,
      };
      const newProject = await (await PROJECT.create(body)).save();
      clog.info(newProject);
      res.status(200).json({ message: "Porject Added Succesfully", result: newProject });
    } else {
      res.status(404).json({ message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateProjects = async (req, res) => {
  const { title, content, img, icon } = req.body;
  const { id } = req.query;
  clog.info(req.body);
  try {
    if (id) {
      const updateProject = await PROJECT.findByIdAndUpdate(id, {
        title: title,
        slug: slugify(String(title)).toLowerCase(),
        content,
        img,
        icon,
      });
      res.status(200).json({ message: "Updated Successfully", result: updateProject });
    } else {
      res.status(404).json({ message: "Project ID not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteProjects = async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const deleteProject = await PROJECT.deleteOne({ _id: id });
      if (deleteProject?.deletedCount) {
        res.status(200).json({ message: "Project Deleted Succesfully" });
      } else {
        res.status(404).json({ message: "Project Not Found" });
      }
    } else {
      res.status(404).json({ message: "Id not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleProject = async (req, res) => {
  const slug = req.params.slug;
  clog.info(slug);
  try {
    if (slug) {
      const result = await PROJECT.findOne({ _id: slug }).populate("tech");
      if (result) {
        res.status(200).json({ message: "Project Found Successfully", result });
      } else {
        res.status(404).json({ message: "Project Not Found" });
      }
    } else {
      res.status(404).json({ message: "Project ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProjects,
  postProjects,
  updateProjects,
  deleteProjects,
  getSingleProject,
};
