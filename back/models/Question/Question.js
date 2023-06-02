module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    "question",
    {
      Question_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      subject: {
        type: DataTypes.STRING,
        defaultValue: "MCQ",
        allowNull: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      correct_answer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Incorrect_Answer: [
      //   // type: DataTypes.ARRAY.STRING,
      //   {
      //     type: DataTypes.STRING,
      //     enum: [''],
      //     allowNull: true,
      //   },
      // ],

      incorrect_answers: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("incorrect_answers"));
        },
        set: function (val) {
          return this.setDataValue("incorrect_answers", JSON.stringify(val));
        },
      },
    },

    {
      updatedAt: false,
    }
  );

  return Questions;
};
