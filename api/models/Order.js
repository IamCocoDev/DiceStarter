const { DataTypes, NOW } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.ENUM('Created', 'In process', 'Canceled', 'Complete'),
      defaultValue: 'Created',
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    address: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    modificationDate: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
  }, {
    timestamps: false,
  });
};
