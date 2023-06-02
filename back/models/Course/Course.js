module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define(
    "course",
       {
          Course_Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
          
          Course_Name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          Course_Category: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          Course_Description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          Course_Session: {
              type: DataTypes.STRING,
              allowNull: true,
            },
          
          
        },
        {
          updatedAt: false,
        }
  );
  
  return Course;
  };