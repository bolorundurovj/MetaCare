const axios = require("axios");
const Config = require("./config");
const Logger = require("./config/logger");
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "metacare";
client.connect().then(() => {
  Logger.success("Seeder connected successfully to db");
});
const db = client.db(dbName);
const moviesCollection = db.collection("movies");
const characterCollection = db.collection("characters");
const commentCollection = db.collection("comments");

async function seedData() {
  const url = Config.swapi;
  const response = await axios.get(url, {
    params: {
      format: "json",
    },
  });
  const movies = response.data.results;
  const total = response.data.count;
  let count = 0;
  let characterCount = 0;
  let totalCharacterCount = 0;
  movies.forEach(async (m) => {
    c = m.characters;
    totalCharacterCount += c.length;
    x = await moviesCollection.findOne({ title: m.title });
    count++;
    if (!x) {
      movie = {
        title: m?.title,
        episodeId: m?.episode_id,
        openingCrawl: m?.opening_crawl,
        director: m?.director,
        producers: m?.producer,
        releaseDate: m?.release_date,
        referenceUrl: m?.url,
        comments: [],
        characters: [],
      };
      moviesCollection.insertOne(movie).then((res) => {
        c.forEach(async (character) => {
          let response = await axios.get(character, {
            params: {
              format: "json",
            },
          });
          response = response.data;
          data = {
            name: response?.name,
            height: Number(response?.height),
            hairColor: response?.hair_color,
            skinColor: response?.skin_color,
            eyeColor: response?.eye_color,
            gender: response?.gender,
            birthYear: response?.birth_year,
            referenceUrl: response?.url,
          };
          characterCollection
            .updateOne(
              { name: response.name },
              { $set: data },
              { upsert: true }
            )
            .then(async (resp) => {
              characterCount++;
              if (resp.upsertedId) {
                Logger.log(`Seeded character ${data.name}`);
                await moviesCollection.updateOne(
                  { _id: res.insertedId },
                  { $addToSet: { characters: resp.upsertedId } },
                  { upsert: true }
                );
              }
              if (count == total && characterCount >= totalCharacterCount) {
                Logger.log(
                  `Seeded ${total} movies and ${totalCharacterCount} characters from SWAPI`
                );
                Logger.success("Data seeding completed successfully ...");
                process.exit();
              }
            });
        });
      });
    }
    Logger.log(`${count} movie(s) out of ${total} seeded`);
  });
}

const deleteData = async () => {
  try {
    await moviesCollection.deleteMany({});
    await characterCollection.deleteMany({});
    await commentCollection.deleteMany({});
    Logger.success("Data destroyed successfully ...");
    process.exit();
  } catch (error) {
    Logger.error(error);
  }
};

if (process.argv[2] === "-s") {
  seedData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
