const upload = require("../../utils/upload");
const { getProjects, postProjects, updateProjects, deleteProjects, getSingleProject } = require("./project.controller");

const projectRouter = require("express").Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", upload.single("img"), postProjects);
projectRouter.put("/", upload.single("img"), updateProjects);
projectRouter.delete("/", deleteProjects);
projectRouter.get("/:slug", getSingleProject);

module.exports = projectRouter;
