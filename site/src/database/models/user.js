'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Rol, {
        foreignKey: {
          name: 'id_rol'
        },
        as: 'rol'
      }),
        User.belongsTo(models.Sex, {
          foreignKey: {
            name: 'id_sex'
          },
          as: 'sex'
        }),
        User.belongsTo(models.Province, {
          foreignKey: {
            name: 'id_province'
          },
          as: 'province'
        })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id_sex: DataTypes.INTEGER,
    id_province: DataTypes.INTEGER,
    id_rol: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};