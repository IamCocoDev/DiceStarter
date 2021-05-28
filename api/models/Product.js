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
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    priceDiscount: {
      type: DataTypes.DECIMAL,
      min: 0.00,
    }
  }, {
    timestamps: false,
  });
};
