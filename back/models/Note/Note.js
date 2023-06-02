module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
  "note",
     {
        Note_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
        
        Note_Name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
	    	Note_type: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        Note_Description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        Note_File: {
          type: DataTypes.STRING,
          allowNull: true,
        },
		
      },
      {
        updatedAt: false,
      }
);

return Note;
};