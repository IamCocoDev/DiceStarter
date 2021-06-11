const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('productxorder', {
    amount: {
      type: DataTypes.INTEGER,
    },
    total_price: {
      type: DataTypes.DECIMAL,
    },
  }, {
    timestamps: false,
  });
};
