const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nickname: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(100), allowNull: false },
  avatar: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  reg_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  subscribers: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  subscriptions: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  friends: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
});

const Review = sequelize.define("review", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  review_text: { type: DataTypes.TEXT },
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 10 } },
  date_of_review: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Film = sequelize.define("film", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(200), allowNull: false },
  poster: { type: DataTypes.STRING },
  genre: { type: DataTypes.STRING(50) },
  year_of_release: { type: DataTypes.INTEGER },
  cast_members: { type: DataTypes.ARRAY(DataTypes.STRING) },
  description: { type: DataTypes.TEXT },
  duration: { type: DataTypes.STRING },
  trailer: { type: DataTypes.STRING(255) },
  is_serial: { type: DataTypes.BOOLEAN, defaultValue: false },
  rating: { type: DataTypes.DECIMAL(2, 1), validate: { min: 1, max: 10 } },
});

const WatchList = sequelize.define("watch_list", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const WatchedList = sequelize.define("watched_list", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_of_watching: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
});

User.hasOne(WatchList); //У пользователя может быть только 1 список запланированного
WatchList.belongsTo(User);

User.hasOne(WatchedList); //У пользователя может быть только 1 список просмотренного
WatchedList.belongsTo(User);

User.hasMany(Review); //У пользователя может быть много отзывов
Review.belongsTo(User);

Film.hasMany(Review); //У фильма может быть много отзывов
Review.belongsTo(Film);

WatchList.belongsToMany(Film, { through: "WatchListFilms" }); // множество фильмов может быть в списке запланированных
Film.belongsToMany(WatchList, { through: "WatchListFilms" }); // фильм может быть в нескольких списках запланированных

WatchedList.belongsToMany(Film, { through: "WatchedListFilms" }); // множество фильмов может быть в списке просмотренных
Film.belongsToMany(WatchedList, { through: "WatchedListFilms" }); // фильм может быть в нескольких списках просмотренных

module.exports = {
  User,
  Review,
  Film,
  WatchList,
  WatchedList,
};
