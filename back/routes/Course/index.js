const router = require('express').Router()
const Course = require('../../controllers/Course/Course_controller')

router.post("/", Course.insertCourse)
router.delete("/:id", Course.delete_Course)
router.get("/", Course.getAllCourse)
router.get("/:id", Course.getCourse)
router.get("/all/:id", Course.geteverything)



module.exports = router