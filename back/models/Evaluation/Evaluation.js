module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define(
    "evaluation",
    {
      Evaluation_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
      },

      Course_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Student_Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Student_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ObtainedGrade: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Evaluation_Description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Evaluation_Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      updatedAt: false,
    }
  );

  return Evaluation;
};
