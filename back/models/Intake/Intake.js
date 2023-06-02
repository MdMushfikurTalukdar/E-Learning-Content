module.exports = (sequelize, DataTypes) => {
    const Intake = sequelize.define(
    "intake",
       {
          Intake_Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
          
          Course_Name: {
            type: DataTypes.STRING,
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
  
  return Intake;
  };
  