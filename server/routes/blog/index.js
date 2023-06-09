const upload = require("../../utils/upload");
const { authVerify } = require("../auth/verifyToken");
const { getBlogs, postBlogs, updateBlogs, deleteBlogs, getSingleBlog, getPersonalBlogs } = require("./blog.controller");

const blogRouter = require("express").Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/me",authVerify, getPersonalBlogs);
blogRouter.post("/", authVerify, upload.single("img"), postBlogs);
blogRouter.put("/", authVerify, upload.single("img"), updateBlogs);
blogRouter.delete("/", authVerify, deleteBlogs);
blogRouter.get("/:slug", getSingleBlog);

module.exports = blogRouter;
