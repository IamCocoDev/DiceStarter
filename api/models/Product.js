const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    picture: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
