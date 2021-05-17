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
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      min: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
