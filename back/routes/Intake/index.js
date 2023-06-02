const router = require('express').Router()
const Intake = require('../../controllers/Intake/Intake_controller')

router.post("/", Intake.insertIntake)
router.delete("/:id", Intake.delete_Intake)
router.get("/", Intake.getAllIntake)
router.get("/:id", Intake.getIntake)
router.get("/student/:id", Intake.getIntakeStudent)
router.get("/course/:id", Intake.getIntakeCourse)
router.get("/teacher/:id", Intake.getIntakeTeacher)



module.exports = router