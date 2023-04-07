const slugify = require("slugify");
const BLOG = require("../../models/blog");

const clog = require("../../utils/chalk");
const { imgUrl, deleteImg } = require("../../utils/upload");
const getBlogs = async (req, res) => {
  console.log("query", req.query);
  const page = req?.query?.page ? req?.query?.page : 0;
  let search = req.query?.search ? req.query?.search : '';
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(search);
  let sort = req.query?.sort ? req.query?.sort : 'created_at';
  let sortPara = req.query?.sortPara ? req.query?.sortPara : -1
  try {
    const blogsCount = await BLOG.count();
    const result = await BLOG.find({
      $or: [
        { title: { $regex: searchRgx } },
        { description: { $regex: searchRgx } },
      ],
    }).populate("author", "name _id profile").limit(10).skip(page * 10).sort({ [sort]: sortPara });
    console.log(result);
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
  let img;
  if (req.file) {
    img = imgUrl(req.file);
  }
  const {
    title,
    slug,
    description,
    content,
  } = req.body;
  const { id } = req.query;
  let result;
  try {
    if (id) {
      const updateBLOG = await BLOG.findOneAndUpdate({ slug: id }, {
        title,
        slug,
        description,
        img,
        content,
      });
      result = updateBLOG;
      res.json({ status: "success", message: "Updated Successfully", result });
    } else {
      res.json({ status: "error", message: "BLOG ID not Found" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Internal Server Error" });
  }
  if (req.file) {
    deleteImg(result.img);
  }
};
const deleteBlogs = async (req, res) => {
  const id = req.query.id;
  const user = req.user;
  clog.error({ user })
  try {
    if (id) {
      let deleteBLOG;
      switch (user?.role) {
        case "admin":
          deleteBLOG = await BLOG.deleteOne({ _id: id });
          break;
        case "author":
          deleteBLOG = await BLOG.deleteOne({ _id: id, author: user._id });
          break;
        default:
          break;
      }

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
