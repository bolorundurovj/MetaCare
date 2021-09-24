const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

if (!isProduction) {
  dotenv.config({ silent: true });
}

const config = {
  database: {
    url: process.env.MONGO_URL
  },
  environment: env,
  swapi: process.env.SWAPI_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
};
module.exports = config;