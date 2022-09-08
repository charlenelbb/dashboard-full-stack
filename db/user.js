const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    // User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
      freezeTableName: true,
    }
  )
  return User
}

// const User = sequelize.define("User", {
//   firstName: {
//     type: Sequelize.STRING,
//   },
//   lastName: {
//     type: Sequelize.STRING,
//   },
// });
