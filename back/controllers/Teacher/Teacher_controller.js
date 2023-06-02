const db = require("../../db/db");
const Teacher = db.Teacher;
const User = db.user;
const { ErrorLogger, customerLogger } = require("../../utils/logger");
// insert Teacher informatio using post request

// module.exports.insertTeacher = async (req, res) => {

//     try {
//         const TeacherInfo = req.body;
//         const result = await Teacher.create(TeacherInfo)
//         if (!result) {
//             return res.send('Result not found')
//         }

//         res.status(200).send({
//             status: "Success",
//             message: "Successfully Teacher information insert",
//             data: result
//         })
//     } catch (error) {

//         res.status(400).send({
//             status: "Fail",
//             message: "Teacher information not found",
//             error: error.message
//         })
//     }

// }

module.exports.SignupTeacher = async (req, res, file) => {
  try {
    // const user = req.body;
    // console.log("user", user);
    //   console.log("ImagePath", req.file);
    const {
      Teacher_Id,
      Teacher_FirstName,
      Teacher_LastName,
      Teacher_Email,
      Password,
      Teacher_Phone,
      Address,
    } = req.body;
    // console.log("user_Id", user_Id);

    const userCheck = await Teacher.findOne({
      where: {
        Teacher_Email: Teacher_Email,
        Teacher_Phone: Teacher_Phone,
      },
    });

    if (userCheck) {
      return res.status(403).send({
        status: "Fail",
        message: "user already exist",
      });
    } else {
      // Insert user information in Add_user table
      const result = await Teacher.create({
        Teacher_Id,
        Teacher_FirstName,
        Teacher_LastName,
        Teacher_Email,
        Password,
        Teacher_Phone,
        Address,
        Img: req.file.path,
      });

      // console.log("ImagePathInfo", req.file);
      //Insert user_Id in Personal_Information table
      const newuser = await User.create({
        User_ID: Teacher_Id,
        User_Name: Teacher_FirstName,
        pass_word: Password,
        User_Email: Teacher_Email,
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

//Get all Teacher information using get request
module.exports.getAllTeacher = async (req, res) => {
  try {
    const result = await Teacher.findAll();

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Teacher information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Teacher information not found",
      error: error.message,
    });
  }
};

//Teacher information delete
module.exports.delete_Teacher = async (req, res) => {
  try {
    const { id } = req.params;
    // const { educationId } = req.params;
    console.log("Teacher Id here", id);

    if (!id) {
      return res.send("Id not found");
    }
    const result = await Teacher.destroy({ where: { Teacher_Id: id } });

    console.log("Teacher_information_update", req.body);
    if (!result) {
      return res.send("Result not found");
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully Teacher information delete",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "No Teacher found",
      error: error.message,
    });
  }
};

// Search specific Teacher

module.exports.getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Teacher.findAll({ where: { Teacher_Id: id } });

    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "All Teacher information",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Teacher information not found",
      error: error.message,
    });
  }
};
