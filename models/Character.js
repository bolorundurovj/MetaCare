module.exports = (sequelize, Sequelize) => {
  const Character = sequelize.define("character", {
    name: {
      type: Sequelize.STRING
    },
    height: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
    hairColor: {
      type: Sequelize.STRING
    },
    skinColor: {
      type: Sequelize.STRING
    },
    eyeColor: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    birthYear: {
      type: Sequelize.STRING
    },
    referenceUrl: {
      type: Sequelize.STRING,
      required: true
    }
  });

  return Character;
};
