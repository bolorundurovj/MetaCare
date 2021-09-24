const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const { Sequelize } = require("sequelize");

const app = express();
const router = express.Router();

const sequelize = new Sequelize("metacare", "newuser", "password", {
  host: "localhost",
  dialect: "mysql",
});


const Routes = require("./routes");
const StaticRoutes = require("./routes/StaticRoutes");
const Config = require("./config");
const Logger = require("./config/logger");
const { handleError } = require("./helpers/ErrorHelper");

const bootstrapApp = async () => {
  await mongoose.connect(Config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await sequelize.authenticate();
    Logger.success("DB Connection has been established successfully.");
  } catch (error) {
    Logger.error("Unable to connect to the database:", error);
  }

  // Setup express middleware
  app.use(morgan("dev"));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, "./static/")));

  // Use Router
  app.use("/api/v1/", Routes.route(router));

  // Static Routes
  app.use("/", StaticRoutes.route(router));

  // General error handler
  app.use((err, req, res, next) => {
    handleError(err, res);
    next();
  });

  await app.listen(Config.port);
};

bootstrapApp().then(() => {
  Logger.log(
    `MetaCare API successfully bootstrapped and running on port: ${Config.port}`
  );
});

module.exports = app;
