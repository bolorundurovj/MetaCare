const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const db = require("./models");

const app = express();
const router = express.Router();

db.sequelize.sync({ force: true }).then(() => {
  Logger.warn("Drop and Re-Sync DB.");
});

const Routes = require("./routes");
const StaticRoutes = require("./routes/StaticRoutes");
const Config = require("./config");
const Logger = require("./config/logger");
const { handleError } = require("./helpers/ErrorHelper");

const bootstrapApp = async () => {
  // Setup express middleware
  app.use(morgan("dev"));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Set security headers
  app.use(helmet());

  //Prevent XSS attacks
  app.use(xss());

  //Prevent Http Parameter Pollution attacks
  app.use(hpp());

  //Rate Limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  //Apply Rate Limit to all requests
  app.use(limiter);

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
