const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orderDetail', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
