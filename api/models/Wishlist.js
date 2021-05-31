const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('wishlist', {
    products: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, {
    timestamps: false,
  });
};
