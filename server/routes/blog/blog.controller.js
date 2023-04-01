const slugify = require("slugify");
const BLOG = require("../../models/blog");

const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");
const getBlogs = async (req, res) => {
  try {
    const result = await BLOG.find();
    res.status(200).json({ result });
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const postBlogs = async (req, res) => {
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
      const newBLOG = await (await BLOG.create(body)).save();
      clog.info(newBLOG);
      res.status(200).json({ message: "BLOG Added Succesfully", result: newBLOG });
    } else {
      res.status(404).json({ message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateBlogs = async (req, res) => {
  const { title, content, img, icon } = req.body;
  const { id } = req.query;
  clog.info(req.body);
  try {
    if (id) {
      const updateBLOG = await BLOG.findByIdAndUpdate(id, {
        title: title,
        slug: slugify(String(title)).toLowerCase(),
        content,
        img,
        icon,
      });
      res.status(200).json({ message: "Updated Successfully", result: updateBLOG });
    } else {
      res.status(404).json({ message: "BLOG ID not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteBlogs = async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const deleteBLOG = await BLOG.deleteOne({ _id: id });
      if (deleteBLOG?.deletedCount) {
        res.status(200).json({ message: "BLOG Deleted Succesfully" });
      } else {
        res.status(404).json({ message: "BLOG Not Found" });
      }
    } else {
      res.status(404).json({ message: "Id not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleBlog = async (req, res) => {
  const slug = req.params.slug;
  clog.info(slug);
  try {
    if (slug) {
      const result = await BLOG.findOne({ slug: slug });
      if (result) {
        res.status(200).json({ message: "BLOG Found Successfully", result });
      } else {
        res.status(404).json({ message: "BLOG Not Found" });
      }
    } else {
      res.status(404).json({ message: "BLOG ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getBlogs,
  postBlogs,
  updateBlogs,
  deleteBlogs,
  getSingleBlog,
};
