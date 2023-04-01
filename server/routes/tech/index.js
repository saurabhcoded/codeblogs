const upload = require("../../utils/upload");
const { getTechs, postTechs, updateTechs, deleteTechs, getSingleTech } = require("./tech.controller");

const techRouter = require("express").Router();
techRouter.get("/", getTechs);
techRouter.post("/", upload.single("icon"), postTechs);
techRouter.put("/", upload.single("icon"), updateTechs);
techRouter.delete("/", deleteTechs);
techRouter.get("/:slug", getSingleTech);

module.exports = techRouter;
