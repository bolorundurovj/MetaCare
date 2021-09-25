const Logger = require("../config/logger");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("metacare", "newuser", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: (msg) => Logger.log(msg),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Movie = require("./Movie.js")(sequelize, Sequelize);
db.Comment = require("./Comment.js")(sequelize, Sequelize);
db.Character = require("./Character.js")(sequelize, Sequelize);

db.Character.belongsToMany(db.Movie, {
  through: "moviecharacters",
  foreignKey: "characterId",
  as: "movies",
});
db.Movie.hasMany(db.Comment, { as: "comments" });
db.Movie.belongsToMany(db.Character, {
  through: "moviecharacters",
  foreignKey: "movieId",
  as: "characters",
});
db.Comment.belongsTo(db.Movie, {
  foreignKey: "movieId",
  as: "movie",
});

const bootstrapDB = async () => {
  try {
    await sequelize.authenticate();
    Logger.success("DB Connection has been established successfully.");
  } catch (error) {
    Logger.error("Unable to connect to the database:", error);
  }
};

bootstrapDB();

module.exports = db;
