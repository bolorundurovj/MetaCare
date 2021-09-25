const axios = require("axios");
const models = require("./models");
const Character = models.Character;
const Movie = models.Movie;
const Comment = models.Comment;
const Config = require("./config");
const Logger = require("./config/logger");

async function seedData() {
  const url = Config.swapi;
  const response = await axios.get(url, {
    params: {
      format: "json",
    },
  });
  let movies = response.data.results;
  const total = response.data.count;
  let count = 0;
  movies.forEach(async (m) => {
    let characters = m.characters;
    count++;
    Movie.create({
      title: m?.title,
      episodeId: m?.episode_id,
      openingCrawl: String(m?.opening_crawl).substring(0, 50),
      director: m?.director,
      producers: m?.producer,
      releaseDate: m?.release_date,
      referenceUrl: m?.url,
    }).then((movie) => {
      characters.forEach(async (c) => {
        let response = await axios.get(c, {
          params: {
            format: "json",
          },
        });
        response = response.data;
        Character.create({
          name: response?.name,
          height: Number(response?.height),
          weight: Number(response?.mass),
          hairColor: response?.hair_color,
          skinColor: response?.skin_color,
          eyeColor: response?.eye_color,
          gender: response?.gender,
          birthYear: response?.birth_year,
          referenceUrl: response?.url,
        }).then((char) => {
          movie.addCharacters(char);
        });
      });

      console.log(res?.dataValues, characters);
    });
    Logger.log(`${count} movie(s) out of ${total} seeded`);
  });
}

const deleteData = async () => {
  Movie.destroy({
    where: {},
    truncate: false,
    cascade: true
  })
    .then((nums) => {
      Logger.log(`${nums} Movies were deleted successfully!`);
      Character.destroy({
        where: {},
        truncate: false,
        cascade: true
      })
        .then((nums) => {
          Logger.log(`${nums} Characters were deleted successfully!`);
          Comment.destroy({
            where: {},
            truncate: false,
          })
            .then((nums) => {
              Logger.log(`${nums} Comments were deleted successfully!`);
              process.exit();
            })
            .catch((err) => {
              Logger.error(err.message);
            });
        })
        .catch((err) => {
          Logger.error(err.message);
        });
    })
    .catch((err) => {
      Logger.error(err.message);
    });
};

if (process.argv[2] === "-s") {
  seedData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
