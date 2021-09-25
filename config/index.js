const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

if (!isProduction) {
  dotenv.config({ silent: true });
}

const config = {
  database: {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    name: process.env.SQL_DBNAME,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD
  },
  environment: env,
  swapi: process.env.SWAPI_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
};
module.exports = config;