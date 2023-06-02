const router = require("express").Router();
const Question = require("../../controllers/Question/Question_controller");

router.post("/", Question.insertQuestion);
router.delete("/:id", Question.delete_Question);
router.get("/", Question.getAllQuestion);
router.get("/:id", Question.getQuestion);

module.exports = router;
