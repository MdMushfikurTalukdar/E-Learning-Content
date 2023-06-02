module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "teacher",
    {
      Teacher_Id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      Teacher_FirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Teacher_LastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Teacher_Email: {
        type: DataTypes.STRING,
        allowNull: true,
        Unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Teacher_Phone: {
        type: DataTypes.STRING,
        allowNull: true,
        Unique: true,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Course_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      updatedAt: false,
    },
    {
      hooks: {
        beforeCreate: async (teacher) => {
          if (teacher.Password) {
            const salt = await bcrypt.genSaltSync(10);
            teacher.Password = bcrypt.hashSync(teacher.Password, salt);
          }
        },
      },
    }
  );
  Teacher.prototype.validPassword = async (Password, hash) => {
    return await bcrypt.compareSync(Password, hash);
  };
  Teacher.prototype.getHashPass = async (Password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(Password, salt);
    return hashed;
  };

  return Teacher;
};
