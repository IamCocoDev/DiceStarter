const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const accessTokenSecret = 'tomasvigilante';
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const productRouter = require('./routes/product');
const categoriesRouter = require('./routes/categories');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');
const { Product, User } = require('./db.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/product', productRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', orderRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.post('/signin', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let user;
    const emailRegEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (username && password) {
      if (emailRegEx.test(username)) {
        user = await User.findOne({ where: { email: username } });
      }
      user = await User.findOne({ where: { name: username } });
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.send('password invalid');
        if (result) {
          const accessToken = jwt.sign({
            name: user.username,
            role: user.role,
          }, accessTokenSecret);
          return res.send({ accessToken });
        }
        return res.send('User not found');
      });
    }
    if (!password || !username) {
      return res.send('Input invalid');
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
  return null;
});

const producto1 = Product.findOrCreate({
  id: '4875e178-655d-41d8-a532-c8c3e12b7f62',
  name: 'Lovecraftesque',
  description: 'Lovecraftesque is the GMless storytelling game of brooding cosmic horror you’ve been waiting for',
  price: 24.99,
  stock: 9,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Lovecraftesque1_700x700.jpg?v=1611004852',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/Lovecraftesque2_911x700.jpg?v=1611004852'],
  color: ['#295B12'],
});
producto1.then((prod) => {
  prod.addCategory(6);
}).catch((e) => new Error(e));

const producto2 = Product.findOrCreate({
  id: 'a3394b85-7aba-4440-9ff6-c26a472124d9',
  name: 'D&D (5e) Van Richtens Guide to Ravenloft',
  description: 'Terror stalks the nightmare realms of Ravenloft. No one knows this better than monster scholar Rudolph Van Richten.',
  price: 49.9,
  stock: 15,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/VanRichten_sGuidetoRavenloft1_480x480.jpg?v=1615500452',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/VanRichten_sGuidetoRavenloft2_480x512.jpg?v=1615500452'],
  color: ['#295B12'],
});
producto2.then((prod) => {
  prod.addCategory(2);
}).catch((e) => new Error(e));

const producto3 = Product.findOrCreate({
  id: '191d5bf1-fbfb-4033-b6f6-56161f896890',
  name: 'Call of Cthulhu (7th ed) Keeper Screen',
  description: 'The Call of Cthulhu Keeper Screen Pack is an essential play aid for those running games of Call of Cthulhu 7th edition.',
  price: 29.99,
  stock: 15,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Call_of_Cthulhu_Keeper_Screen_1_480x480.png?v=1576881072',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/Call_of_Cthulhu_Keeper_Screen_2_464x600.png?v=1576881072'],
  color: ['#295B12'],
});
producto3.then((prod) => {
  prod.addCategory(6);
}).catch((e) => new Error(e));

const producto4 = Product.findOrCreate({
  id: '15670bea-b30f-4948-850b-12e320293493',
  name: 'D&D (5e) Mythic Odysseys of Theros',
  description: 'Legends walk the lands of Theros, a realm shaped by deities and the deeds of heroes.',
  price: 49.9,
  stock: 20,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/MythicOdysseysofTheros1_300x300.png?v=1593473211'],
  color: ['#295B12'],
});
producto4.then((prod) => {
  prod.addCategory(2);
}).catch((e) => new Error(e));

const producto5 = Product.findOrCreate({
  id: '303e99fc-b698-4d57-9968-babd3a9db6f9',
  name: 'Call of Cthulhu (7th ed) Quick Start',
  description: 'Welcome to Chaosium’s Call of Cthulhu 7th Edition Quick-Start Rules, a booklet that collects the essential rules for Call of Cthulhu 7th Edition and presents them in abbreviated form.',
  price: 9.99,
  stock: 10,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Call_of_Cthulhu_Quick_Start_Rules_1_480x480.PNG?v=1578074416',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/Call_of_Cthulhu_Quick_Start_Rules_2_480x608.png?v=1578074416'],
  color: ['#295B12'],
});
producto5.then((prod) => {
  prod.addCategory(6);
}).catch((e) => new Error(e));

const producto6 = Product.findOrCreate({
  id: 'be4c2dbb-4699-4b07-a5b8-7aba780fe8db',
  name: 'D&D (5e) A Young Adventurers Guide : Monsters & Creatures',
  description: 'This introductory guide to Dungeons & Dragons provides a fun and immersive primer to its beasts and monsters.',
  price: 12.99,
  stock: 30,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Young_Adventurers_Monsters_and_Creatures_1_480x480.png?v=1580335290'],
  color: ['#295B12'],
});
producto6.then((prod) => {
  prod.addCategory(2);
}).catch((e) => new Error(e));

const producto7 = Product.findOrCreate({
  id: '6a1dee0c-cabe-4bb5-907f-634b499156b6',
  name: 'D&D (5e) Players Handbook',
  description: 'The Player’s Handbook is the essential reference for every Dungeons & Dragons roleplayer. It contains rules for character creation and advancement, backgrounds and skills, exploration and combat, equipment, spells, and much more. Use this book to create exciting characters from among the most iconic D&D races and classes..',
  price: 59.9,
  stock: 20,
  size: '20.32 x 25.40',
  picture: ['https://images-na.ssl-images-amazon.com/images/I/81pViXqeVLL.jpg', 'https://i.pinimg.com/originals/c7/a3/4a/c7a34a87faa5c50662794e2b3bdfb900.jpg'],
  color: ['#295B12'],
});
producto7.then((prod) => {
  prod.addCategory(2);
}).catch((e) => new Error(e));

const producto8 = Product.findOrCreate({
  id: 'f973809e-c7e6-4399-9daa-667197327b9e',
  name: 'Call of Cthulhu (7th ed) Core Rulebook Keeper Rulebook',
  description: 'The core rulebook gives you everything you need to get started!',
  price: 54.99,
  stock: 16,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/call_of_cthulhu_rulebook_480x480.png?v=1571446678'],
  color: ['#264386'],
});
producto8.then((prod) => {
  prod.addCategory(6);
}).catch((e) => new Error(e));

const producto9 = Product.findOrCreate({
  id: '8a2c060c-69e1-4afa-afcc-aa451b0673e8',
  name: 'Star Wars RPG Classic (30th Anniversary ed) Box Set',
  description: 'Few books or games have had as enduring an impact upon the Star Wars galaxy and its fans as Star Wars: The Roleplaying Game.',
  price: 59.99,
  stock: 40,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Young_Adventurers_Monsters_and_Creatures_1_480x480.png?v=1580335290', 'https://cdn.shopify.com/s/files/1/1633/7907/products/sww01_both-books_480x352.jpg?v=1578074394', 'https://cdn.shopify.com/s/files/1/1633/7907/products/sww01_rb_open2_480x224.jpg?v=1578074394'],
  color: ['#295B12'],
});
producto9.then((prod) => {
  prod.addCategory(5);
}).catch((e) => new Error(e));

const producto10 = Product.findOrCreate({
  id: '472377c9-6b1d-4a19-ae1e-ea58fd29404c',
  name: 'Call of Cthulhu (7th ed) Core Rulebook Investigator Handbook',
  description: 'We live on a placid island of ignorance in the midst of black seas of infinity, and it was not meant that we should voyage far.',
  price: 44.99,
  stock: 20,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Call_of_Cthulhu_Investigator_Handbook_1_480x480.PNG?v=1571446669',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/Call_of_Cthulhu_Investigator_Handbook_2_480x608.png?v=1571446669'],
  color: ['#684E16'],
});
producto10.then((prod) => {
  prod.addCategory(6, 8);
}).catch((e) => new Error(e));

const producto11 = Product.findOrCreate({
  id: 'a9b805b3-5fc0-4507-b7d2-4ad65c23b4be',
  name: 'Star Wars Edge of the Empire Beginner Box',
  description: 'Gather your friends and prepare for adventure in the Star Wars galaxy!',
  price: 29.99,
  stock: 90,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/SW_EE_Beginner_Game_300x300.png?v=1578090777'],
  color: ['#295B12'],
});
producto11.then((prod) => {
  prod.addCategory(5);
}).catch((e) => new Error(e));

const producto12 = Product.findOrCreate({
  id: '871f3f79-e31f-40a5-bdf3-bcd815237581',
  name: 'D&D (5e) Players Handbook',
  description: 'The Player’s Handbook is the essential reference for every Dungeons & Dragons roleplayer. It contains rules for character creation and advancement, backgrounds and skills, exploration and combat, equipment, spells, and much more. Use this book to findOrCreate exciting characters from among the most iconic D&D races and classes..',
  price: 59.9,
  stock: 20,
  size: '20.32 x 25.40',
  picture: ['https://images-na.ssl-images-amazon.com/images/I/81pViXqeVLL.jpg', 'https://i.pinimg.com/originals/c7/a3/4a/c7a34a87faa5c50662794e2b3bdfb900.jpg'],
  color: ['#295B12'],
});
producto12.then((prod) => {
  prod.addCategory(2);
}).catch((e) => new Error(e));

const producto13 = Product.findOrCreate({
  id: '63c5fd31-f9d6-48a8-85c3-6f090d6bcc22',
  name: 'Star Wars Age of Rebellion Beginner Box',
  description: 'The Star Wars: Age of Rebellion Beginner Game is the perfect entry into the Star Wars: Age of Rebellion roleplaying experience for players of all skill levels.',
  price: 29.99,
  stock: 90,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/SW_Age_of_Rebellion_Beginner_Game_300x300.png?v=1578090615'],
  color: ['#295B12'],
});
producto13.then((prod) => {
  prod.addCategory(5);
}).catch((e) => new Error(e));

const producto14 = Product.findOrCreate({
  id: '02e1c239-5082-4d55-ac72-49bbe3d792a4',
  name: 'Star Trek Adventures Command Division',
  description: 'The Command Division supplement provides Gamemasters and Players with a wealth of new material for use in Star Trek Adventures for characters in the command division.',
  price: 34.99,
  stock: 5,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Star-Trek-The-Command-Division-Cover-No-Logos_480x480.jpg?v=1578074318',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/command_preview_1_crop_480x320.jpg?v=1578074318'],
  color: ['#326495'],
});
producto14.then((prod) => {
  prod.addCategory(4, 8);
}).catch((e) => new Error(e));

const producto15 = Product.findOrCreate({
  id: 'ed27f4ef-ada2-4200-b43a-5c8f03fc5249',
  name: 'Star Wars Force Awakens Beginner Box',
  description: 'The perfect entry into the Star Wars roleplaying experience for all skill levels.',
  price: 29.99,
  stock: 90,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/swr09_main_325x325.jpg?v=1578074396', 'https://cdn.shopify.com/s/files/1/1633/7907/products/swr09_spread_480x288.jpg?v=1578074396'],
  color: ['#295B12'],
});
producto15.then((prod) => {
  prod.addCategory(5);
}).catch((e) => new Error(e));

const producto16 = Product.findOrCreate({
  id: '45a5aae6-1c84-439f-810e-5e3fa0dabb5d',
  name: 'Star Trek Adventures Core Rulebook',
  description: 'Welcome to your new assignment, Captain. Your continuing mission, to explore strange new worlds, seek out new life and new civilizations, to bodly go where no one has gone before',
  price: 57.99,
  stock: 5,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Star_Trek_Adventures_Core_1_e771c88b-a55b-439f-84c6-9217d3b1204f_480x480.png?v=1578074610',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/Star_Trek_Adventures_Core_2_480x320.png?v=1578074611'],
  color: ['#326495'],
});
producto16.then((prod) => {
  prod.addCategory(4, 8);
}).catch((e) => new Error(e));

const producto17 = Product.findOrCreate({
  id: '24caa9f4-136e-4540-a138-931e862bcdc4',
  name: 'Alien RPG',
  description: 'This is the official ALIEN tabletop roleplaying game—a universe of body horror and corporate brinkmanship, where synthetic people play god while space truckers and marines serve host to newborn ghoulish creatures. It’s a harsh and unforgiving universe and you are nothing if not expendable.',
  price: 49.99,
  stock: 30,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Alien_RPG_1_480x480.png?v=1578197801',
    'https://cdn.shopify.com/s/files/1/1633/7907/products/Alien_RPG_5_480x320.png?v=1578197802'],
  color: ['#0F151C'],
});
producto17.then((prod) => {
  prod.addCategory(9, 7);
}).catch((e) => new Error(e));

const producto18 = Product.findOrCreate({
  id: '795ebbe6-b07d-49c9-bd54-3a4757bc223c',
  name: 'Bite Marks',
  description: 'Maybe you were born this way, and raised as a wild creature.',
  price: 32.99,
  stock: 70,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/BiteMarksrpg1_480x480.png?v=1609273988'],
  color: ['#295B12'],
});
producto18.then((prod) => {
  prod.addCategory(3);
}).catch((e) => new Error(e));

const producto19 = Product.findOrCreate({
  id: 'af32dbc-7fcc-4d28-856b-86a7260050fe',
  name: 'Ruma : Dawn of Empire',
  description: 'Citizen! The burgeoning Ruman Empire needs your help bringing civilization to the savages.',
  price: 19.99,
  stock: 20,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Ruma_Dawn_of_an_Empire_1_300x300.png?v=1578075576'],
  color: ['#295B12'],
});
producto19.then((prod) => {
  prod.addCategory(3);
}).catch((e) => new Error(e));

const producto20 = Product.findOrCreate({
  id: 'd825ca84-f77b-4bc2-8b85-874d2df67fec',
  name: 'Cyberpunk Red Jumpstart Kit',
  description: 'The 4th Corporate War’s over and the big dogs have retreated to their corners to lick their wounds. That leaves everyone else to fend for themselves in a shattered world.',
  price: 29.99,
  stock: 30,
  size: '20.32 x 25.40',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/Cyberpunk_Red_Jumpstart_Kit_480x480.png?v=1571447063'],
  color: ['#0F151C'],
});
producto20.then((prod) => {
  prod.addCategory(9);
}).catch((e) => new Error(e));

const producto21 = Product.findOrCreate({
  id: '1cb1b1e7-68cf-4dcb-8fe1-998be04ff37b',
  name: 'D&D (5e) Character Sheets',
  description: 'Includes a full set of fifth edition D&D character sheets, plus three additional styles of double-sided character sheets.',
  price: 9.99,
  stock: 150,
  size: 'A4',
  picture: ['https://cdn.shopify.com/s/files/1/1633/7907/products/D_D_Character_Sheets_1_300x300.png?v=1571446647'],
  color: ['#295B12'],
});
producto21.then((prod) => {
  prod.addCategory(2, 10);
}).catch((e) => new Error(e));

const producto22 = Product.findOrCreate({
  id: 'b70c8e05-4a3d-40ae-b11d-31b8f3d860da',
  name: 'Metal 12-sided d4',
  description: 'A metal d4. This is a regular dodecahedron (12 sides) triply numbered 1-4. Rolls much better than a standard d4.',
  price: 8.00,
  stock: 30,
  size: '13mm',
  picture: ['http://mathartfun.com/shopsite_sc/store/html/Metal12d4.jpg'],
  color: ['#585858'],
});
producto22.then((prod) => {
  prod.addCategory(1);
}).catch((e) => new Error(e));

module.exports = app;
