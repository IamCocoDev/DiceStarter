const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    system: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
  });
};
