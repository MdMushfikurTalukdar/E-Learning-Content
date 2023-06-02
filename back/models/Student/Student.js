module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      Student_Id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      Student_FirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Student_LastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Student_Email: {
        type: DataTypes.STRING,
        allowNull: true,
        Unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Student_Phone: {
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
      Ongoing_Course: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Completed_Courses: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      updatedAt: false,
    },
    {
      hooks: {
        beforeCreate: async (student) => {
          if (student.Password) {
            const salt = await bcrypt.genSaltSync(10);
            student.Password = bcrypt.hashSync(student.Password, salt);
          }
        },
      },
    }
  );
  Student.prototype.validPassword = async (Password, hash) => {
    return await bcrypt.compareSync(Password, hash);
  };
  Student.prototype.getHashPass = async (Password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(Password, salt);
    return hashed;
  };

  return Student;
};
