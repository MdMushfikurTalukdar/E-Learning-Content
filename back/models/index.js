// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced");
  })
  .catch((err) => {
    console.log("Error on re-synced", err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require("../models/users/user")(db.sequelize, DataTypes);
db.Student = require("../models/Student/Student")(db.sequelize, DataTypes);
db.Teacher = require("../models/Teacher/Teacher")(db.sequelize, DataTypes);
db.Course = require("../models/Course/Course")(db.sequelize, DataTypes);
db.Quiz = require("../models/Quiz/Quiz")(db.sequelize, DataTypes);
db.Questions = require("../models/Question/Question")(db.sequelize, DataTypes);
db.Note = require("../models/Note/Note")(db.sequelize, DataTypes);
db.Intake = require("../models/Intake/Intake")(db.sequelize, DataTypes);
db.Evaluation = require("../models/Evaluation/Evaluation")(
  db.sequelize,
  DataTypes
);
db.Video = require("../models/Video/Video")(db.sequelize, DataTypes);

db.Course.hasMany(db.Intake, { foreignkey: "Course_Id" });
db.Intake.belongsTo(db.Course, { foreignkey: "Course_Id" });

db.Teacher.hasMany(db.Intake, { foreignkey: "Teacher_Id" });
db.Intake.belongsTo(db.Teacher, { foreignkey: "Teacher_Id" });

db.Student.hasMany(db.Intake, { foreignkey: "Student_Id" });
db.Intake.belongsTo(db.Student, { foreignkey: "Student_Id" });

db.Evaluation.hasOne(db.Intake, { foreignkey: "Evaluation_Id" });
db.Intake.belongsTo(db.Evaluation, { foreignkey: "Evaluation_Id" });

db.Course.hasMany(db.Quiz, { foreignkey: "Course_Id" });
db.Quiz.belongsTo(db.Course, { foreignkey: "Course_Id" });

db.Quiz.hasMany(db.Questions, { foreignkey: "Quiz_Id" });
db.Questions.belongsTo(db.Quiz, { foreignkey: "Quiz_Id" });

db.Course.hasMany(db.Note, { foreignkey: "Course_Id" });
db.Note.belongsTo(db.Course, { foreignkey: "Course_Id" });

db.Course.hasMany(db.Video, { foreignkey: "Course_Id" });
db.Video.belongsTo(db.Course, { foreignkey: "Course_Id" });

module.exports = db;
