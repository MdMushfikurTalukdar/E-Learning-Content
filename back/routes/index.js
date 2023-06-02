const router = require("express").Router();
const user = require("./users");
const Student = require("./Student");
const Teacher = require("./Teacher");
const Course = require("./Course");
const Note = require("./Note");
const Question = require("./Question");
const Quiz = require("./Quiz");
const Intake = require("./Intake");
const Evaluation = require("./Evaluation");
const Videos = require("./Videos");

router.use("/user", user);
router.use("/Student", Student);
router.use("/Teacher", Teacher);
router.use("/Course", Course);
router.use("/Note", Note);
router.use("/Question", Question);
router.use("/Quiz", Quiz);
router.use("/Intake", Intake);
router.use("/Evaluation", Evaluation);
router.use("/Videos",Videos);

module.exports = router;
