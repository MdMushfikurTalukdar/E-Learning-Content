const db = require("../../db/db");
const Quiz = db.Quiz;

// insert Quiz informatio using post request

module.exports.insertQuiz = async (req, res) => {
  try {
    const QuizInfo = req.body;
    const result = await Quiz.create(QuizInfo);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Quiz information insert",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Fail",
      message: "Quiz information not found",
      error: error.message,
    });
  }
};

//Get all Quiz information using get request
module.exports.getAllQuiz = async (req, res) => {
  try {
    const result = await Quiz.findAll();

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Quiz information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Quiz information not found",
      error: error.message,
    });
  }
};

//Quiz information delete
module.exports.delete_Quiz = async (req, res) => {
  try {
    const { id } = req.params;
    // const { educationId } = req.params;
    console.log("Quiz Id here", id);

    if (!id) {
      return res.send("Id not found");
    }
    const result = await Quiz.destroy({ where: { Quiz_Id: id } });

    console.log("Quiz_information_update", req.body);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Quiz information delete",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "No Quiz found",
      error: error.message,
    });
  }
};

// Search specific Quiz

module.exports.getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Quiz.findAll({ where: { Quiz_Id: id } });

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Quiz information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Quiz information not found",
      error: error.message,
    });
  }
};
