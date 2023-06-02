const db = require("../../db/db");
const Evaluation = db.Evaluation;

// insert Evaluation informatio using post request

module.exports.insertEvaluation = async (req, res) => {
  try {
    const EvaluationInfo = req.body;
    console.log('EvaluationInfo', EvaluationInfo);
    const result = await Evaluation.create(EvaluationInfo);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Evaluation information insert",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Fail",
      message: "Evaluation information not found",
      error: error.message,
    });
  }
};

//Get all Evaluation information using get request
module.exports.getAllEvaluation = async (req, res) => {
  try {
    const result = await Evaluation.findAll();

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Evaluation information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Evaluation information not found",
      error: error.message,
    });
  }
};

//Evaluation information delete
module.exports.delete_Evaluation = async (req, res) => {
  try {
    const { id } = req.params;
    // const { educationId } = req.params;
    console.log("Evaluation Id here", id);

    if (!id) {
      return res.send("Id not found");
    }
    const result = await Evaluation.destroy({ where: { Evaluation_Id: id } });

    console.log("Evaluation_information_delete", req.body);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Evaluation information delete",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "No Evaluation found",
      error: error.message,
    });
  }
};

//Evaluation information update
module.exports.update_Evaluation = async (req, res) => {
  try {
    const { id } = req.params;
    // const { educationId } = req.params;
    console.log("Evaluation Id here", id);

    if (!id) {
      return res.send("Id not found");
    }
    const result = await Evaluation.update(req.body, { where: { Evaluation_Id: id } });

    console.log("Evaluation_information_update", req.body);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Evaluation information update",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "No Evaluation found",
      error: error.message,
    });
  }
};

// Individual student evaluation information
module.exports.getEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Evaluation.findAll({ where: { Student_Id: id } });

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Evaluation information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Evaluation information not found",
      error: error.message,
    });
  }
};
