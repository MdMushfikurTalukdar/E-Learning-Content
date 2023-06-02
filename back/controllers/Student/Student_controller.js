const db = require("../../db/db");
const Student = db.Student;
const User = db.user;
const { ErrorLogger, customerLogger } = require("../../utils/logger");

// insert Student informatio using post request

module.exports.SignupStudent = async (req, res, file) => {
  try {
    // const user = req.body;
    // console.log("user", user);
    //   console.log("ImagePath", req.file);
    const {
      Student_Id,
      Student_FirstName,
      Student_LastName,
      Student_Email,
      Password,
      Student_Phone,
      Address,
    } = req.body;
    // console.log("user_Id", user_Id);

    const userCheck = await Student.findOne({
      where: {
        Student_Email: Student_Email,
        Student_Phone: Student_Phone,
      },
    });

    if (userCheck) {
      return res.status(403).send({
        status: "Fail",
        message: "user already exist",
      });
    } else {
      // Insert user information in Add_user table
      const result = await Student.create({
        Student_Id,
        Student_FirstName,
        Student_LastName,
        Student_Email,
        Password,
        Student_Phone,
        Address,
        Img: req.file.path,
      });

      // console.log("ImagePathInfo", req.file);
      //Insert user_Id in Personal_Information table
      const newuser = await User.create({
        User_ID: Student_Id,
        User_Name: Student_FirstName,
        pass_word: Password,
        User_Email: Student_Email,
        role: "user",
      });

      // console.log("User", newuser);

      res.status(200).send({
        status: "Success",
        message: "You successfully added user information",
        data: result,
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "You couldn't added user informaion",
      error: error.message,
    });
    ErrorLogger.error("add_user create" + " " + error.message);
  }
};

//Get all Student information using get request
module.exports.getAllStudent = async (req, res) => {
  try {
    const result = await Student.findAll();

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Student information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Student information not found",
      error: error.message,
    });
  }
};

//Student information delete
module.exports.delete_Student = async (req, res) => {
  try {
    const { id } = req.params;
    // const { educationId } = req.params;
    console.log("Student Id here", id);

    if (!id) {
      return res.send("Id not found");
    }
    const result = await Student.destroy({ where: { Student_Id: id } });

    console.log("Student_information_update", req.body);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Student information delete",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "No Student found",
      error: error.message,
    });
  }
};

// Search specific student

module.exports.getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.findAll({ where: { Student_Id: id } });

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Student information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Student information not found",
      error: error.message,
    });
  }
};

// student can see the taken or done courses

module.exports.getIntakeCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Intake.findAll({ where: { Course_Id: id } });

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Intake information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Intake information not found",
      error: error.message,
    });
  }
};
