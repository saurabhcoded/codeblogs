const upload = require("../../utils/upload");
const { getTestimonials, postTestimonials, updateTestimonials, deleteTestimonials, getSingleTestimonial } = require("./testimonial.controller");

const testimonialRouter = require("express").Router();
testimonialRouter.get("/", getTestimonials);
testimonialRouter.post("/", upload.single("profile"), postTestimonials);
testimonialRouter.put("/", upload.single("profile"), updateTestimonials);
testimonialRouter.delete("/", deleteTestimonials);
testimonialRouter.get("/:slug", getSingleTestimonial);

module.exports = testimonialRouter;
