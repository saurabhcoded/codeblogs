const app = require("express")();
const authRouter = require("./auth");
const blogRouter = require("./blog");
const experienceRouter = require("./experience");
const projectRouter = require("./project");
const serviceRouter = require("./service");
const techRouter = require("./tech");
const testimonialRouter = require("./testimonial");
const userRouter = require("./users");

app.use("/services", serviceRouter);
app.use("/blogs", blogRouter);
app.use("/experience", experienceRouter);
app.use("/testimonial", testimonialRouter);
app.use("/tech", techRouter);
app.use("/project", projectRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.get("/", (req, res) => {
    res.send("Server is Working here")
})

module.exports = app;
