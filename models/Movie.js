module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movie", {
    title: {
      type: Sequelize.STRING,
    },

    episodeId: {
      type: Sequelize.INTEGER,
    },  
    openingCrawl: {
      type: Sequelize.STRING,
    },
    director: {
      type: Sequelize.STRING,
    },
    producers: {
      type: Sequelize.STRING,
    },
    releaseDate: {
      type: Sequelize.DATE,
    },
    referenceUrl: {
      type: Sequelize.STRING,
    },
  });

  return Movie;
};
