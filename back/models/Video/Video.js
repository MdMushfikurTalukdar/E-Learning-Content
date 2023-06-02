module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define(
      'video',
      {
          Video_Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        videoUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        thumbnailUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        updatedAt: false,
      }
    );
  
    return Video;
  };
  