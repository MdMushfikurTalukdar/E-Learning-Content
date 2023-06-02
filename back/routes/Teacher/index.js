const router = require("express").Router();
const Teacher = require("../../controllers/Teacher/Teacher_controller");
const { upload } = require("../../middlewares/upload");

router.post("/signup", upload, Teacher.SignupTeacher);
router.delete("/:id", Teacher.delete_Teacher);
router.get("/", Teacher.getAllTeacher);
router.get("/:id", Teacher.getTeacher);

module.exports = router;
