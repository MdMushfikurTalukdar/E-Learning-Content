const router = require('express').Router()
const Student = require('../../controllers/Student/Student_controller')
const { upload } = require('../../middlewares/upload')

router.post("/signup",upload, Student.SignupStudent)
router.delete("/:id", Student.delete_Student)
router.get("/", Student.getAllStudent)
router.get("/:id", Student.getStudent)



module.exports = router