const db = require("../../models");
const Questions = db.Questions;

// insert Question informatio using post request

module.exports.insertQuestion = async (req, res) => {
  try {
    const QuestionInfo = req.body;
    const {
      Subject,
      Question,
      Correct_Answer,
      Incorrect_Answer1,
      Incorrect_Answer2,
      Incorrect_Answer3,
    } = req.body;

    let Incorrect_Answer = [];
    Incorrect_Answer.push(
      Incorrect_Answer1,
      Incorrect_Answer2,
      Incorrect_Answer3
    );

    const data = {
      subject: Subject,
      question: Question,
      correct_answer: Correct_Answer,
      incorrect_answers: Incorrect_Answer,
    };

    console.log("QuestionInfo", data);
    const result = await Questions.create(data);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Question information insert",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Fail",
      message: "Question information not found",
      error: error.message,
    });
  }
};

//Get all Question information using get request
module.exports.getAllQuestion = async (req, res) => {
  try {
    const result = await Questions.findAll();

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Question information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Question information not found",
      error: error.message,
    });
  }
};

//Question information delete
module.exports.delete_Question = async (req, res) => {
  try {
    const { id } = req.params;
    // const { educationId } = req.params;
    console.log("Question Id here", id);

    if (!id) {
      return res.send("Id not found");
    }
    const result = await Questions.destroy({ where: { Question_Id: id } });

    console.log("Question_information_update", req.body);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Question information delete",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "No Question found",
      error: error.message,
    });
  }
};

// Search specific Question

module.exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Questions.findAll({ where: { Question_Id: id } });

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Question information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Question information not found",
      error: error.message,
    });
  }
};
