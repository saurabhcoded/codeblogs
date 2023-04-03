const slugify = require("slugify");
const BLOG = require("../../models/blog");

const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");
const getBlogs = async (req, res) => {
  console.log("query", req.query);
  const page = req?.query?.page ? req?.query?.page : 0;
  try {
    const blogsCount = await BLOG.count();
    const result = await BLOG.find().populate("author", "name _id profile").limit(10).skip(page * 10);
    res.json({ status: "success", result, count: blogsCount });
  } catch (error) {
    clog.error(error);
    res.json({ status: "error", message: "Internal Server Error" });
  }
};
const getPersonalBlogs = async (req, res) => {
  const user = req.user;
  try {
    const result = await BLOG.find({ author: user?.id }).populate("author", "name _id profile").exec();
    clog.warning({ status: "success", result })
    res.json({ status: "success", result });
  } catch (error) {
    clog.error(error);
    res.json({ status: "error", message: "Internal Server Error" });
  }
};

const postBlogs = async (req, res) => {
  const img = imgUrl(req.file);
  console.log(req?.body)
  const { title, slug, content, author, description } = req.body;
  try {
    if (title && content && img && slug && description && author) {
      const body = {
        title,
        slug,
        description,
        img,
        content,
        author
      };
      const newBLOG = await (await BLOG.create(body)).save();
      clog.info(newBLOG);
      res.json({ status: "success", message: "BLOG Added Succesfully", result: newBLOG });
    } else {
      res.json({ status: "error", message: "Error 404 body not found" });
    }
  } catch (error) {
    clog.error(error);
    res.json({ status: "error", message: "Internal Server Error" });
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
      const result = await BLOG.findOne({ slug: slug }).populate("author", "name _id profile");
      if (result) {
        res.json({ status: "success", message: "BLOG Found Successfully", result });
      } else {
        res.json({ status: "error", message: "BLOG Not Found" });
      }
    } else {
      res.json({ status: "warning", message: "BLOG ID Not Found" });
    }
  } catch (error) {
    clog.error(error);
    res.json({ status: "success", message: "Internal Server Error" });
  }
};

module.exports = {
  getBlogs,
  postBlogs,
  updateBlogs,
  deleteBlogs,
  getSingleBlog,
  getPersonalBlogs
};
