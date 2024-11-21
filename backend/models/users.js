module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              is: /^\+[1-9]\d{1,14}$/i,
            },
          },
          role: {
            type: DataTypes.ENUM('admin', 'user', 'guest'),
            allowNull: false,
            defaultValue: 'user',
          },
          avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isUrl: true,
            },
          },
        }, {
          tableName: 'users',
          timestamps: true,
          underscored: true,
    });
}