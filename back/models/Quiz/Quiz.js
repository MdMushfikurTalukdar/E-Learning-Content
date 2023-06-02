module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define(
    "quiz",
       {
          Quiz_Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
          
          Quiz_Name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          Quiz_type: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          Quiz_Mark: {
            type: DataTypes.BLOB,
            allowNull: true,
          },
          
        },
        {
          updatedAt: false,
        }
  );
  
  return Quiz;
  };