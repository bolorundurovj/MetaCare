module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: Sequelize.STRING,
    },
    movieId: {
      type: Sequelize.INTEGER,
    },
    ipAddress: {
      type: Sequelize.STRING,
    }
  });

  return Comment;
};
