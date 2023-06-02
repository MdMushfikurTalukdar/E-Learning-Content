const router = require('express').Router()
const Quiz = require('../../controllers/Quiz/Quiz_controller')

router.post("/", Quiz.insertQuiz)
router.delete("/:id", Quiz.delete_Quiz)
router.get("/", Quiz.getAllQuiz)
router.get("/:id", Quiz.getQuiz)



module.exports = router