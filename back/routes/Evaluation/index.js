const router = require('express').Router()
const Evaluation = require('../../controllers/Evaluation/Evaluation_controller')

router.post("/", Evaluation.insertEvaluation)
router.delete("/:id", Evaluation.delete_Evaluation)
router.put("/:id", Evaluation.update_Evaluation)
router.get("/", Evaluation.getAllEvaluation)
router.get("/:id", Evaluation.getEvaluation)



module.exports = router