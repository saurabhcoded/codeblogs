const USER = require("../../models/user");

const fetchAllUsers = async (req, res) => {
    const user = req.user
    if (user?.role === "admin") {
        const users = await USER.find({ role: { $ne: "admin" } })
        res.json({ status: "success", result: users })
    } else {
        res.json({ status: "error", message: "This route is not accessable to you" })
    }
}
const deleteUser = async (req, res) => {
    const user = req.user
    if (user?.role === "admin") {
        const id = req.query.id;
        try {
            if (id) {
                const deleteUSER = await USER.deleteOne({ _id: id });
                if (deleteUSER?.deletedCount) {
                    res.json({ status: "error", message: "User Deleted Succesfully" });
                } else {
                    res.json({ status: "error", message: "User Not Found" });
                }
            } else {
                res.json({ status: "error", message: "Id not Found" });
            }
        } catch (error) {
            clog.error(error);
            res.json({ status: "error", message: "Internal Server Error" });
        }
    } else {
        res.json({ status: "error", message: "This route is not accessable to you" })
    }
}
module.exports = {
    fetchAllUsers,
    deleteUser
}