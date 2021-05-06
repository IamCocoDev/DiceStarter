/* eslint-disable global-require */
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models,
// los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, './src/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require
    // eslint-disable-next-line import/no-dynamic-require
    // eslint-disable-next-line global-require
    // eslint-disable-next-line import/no-dynamic-require
    modelDefiners.push(require(path.join(__dirname, './src/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
// eslint-disable-next-line prefer-const
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// const { Dog, Temperament } = sequelize.models;

const {
  User, Role, Product, Order, Category,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.belongsToMany(Role, { through: 'user_roles' });
Role.belongsToMany(User, { through: 'user_roles' });
Product.belongsToMany(Category, { through: 'product_categories' });
Category.belongsToMany(Product, { through: 'product_categories' });
User.hasMany(Product);
Product.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: 'product_order' });
Order.belongsToMany(Product, { through: 'product_order' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así:
  // const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
