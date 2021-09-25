class OutputFormatter {
  static formatMovie(movie) {
    if (!movie) {
      return {};
    }

    const response = {
      id: movie.id,
      title: movie.title,
      episodeId: movie.episodeId,
      openingCrawl: movie.openingCrawl,
      director: movie.director,
      producers: movie.producers.split(","),
      releaseDate: movie.releaseDate,
      comments: movie.comments.length,
      characters: movie.characters.length,
    };

    return response;
  }

  static formatCharacter(character) {
    if (!character) {
      return {};
    }

    const response = {
      id: character.id,
      name: character.name,
      heightMetric: character.height,
      heightImperial: (character.height *  0.03281),
      weight: character.weight,
      hairColor: character.hairColor,
      skinColor: character.skinColor,
      eyeColor: character.eyeColor,
      gender: character.gender,
      birthYear: character.birthYear
    };

    return response;
  }
}

module.exports = OutputFormatter;
