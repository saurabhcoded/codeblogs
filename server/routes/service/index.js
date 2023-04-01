const upload = require("../../utils/upload");
const { getServices, postServices, updateServices, deleteServices, getSingleService } = require("./service.controller");

const serviceRouter = require("express").Router();

serviceRouter.get("/", getServices);
serviceRouter.post("/", upload.single("img"), postServices);
serviceRouter.put("/", upload.single("img"), updateServices);
serviceRouter.delete("/", deleteServices);
serviceRouter.get("/:slug", getSingleService);

module.exports = serviceRouter;
