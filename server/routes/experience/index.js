const { getExperiences, postExperiences, updateExperiences, deleteExperiences, getSingleExperience } = require("./experience.controller");

const experienceRouter = require("express").Router();

experienceRouter.get("/", getExperiences);
experienceRouter.post("/", postExperiences);
experienceRouter.put("/", updateExperiences);
experienceRouter.delete("/", deleteExperiences);
experienceRouter.get("/:slug", getSingleExperience);

module.exports = experienceRouter;
