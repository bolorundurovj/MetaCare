class OutputFormatter {
  static formatMovie(movie) {
    if (!movie) {
      return {};
    }

    const response = {
      id: movie._id,
      title: movie.title,
      episodeId: movie.episodeId,
      openingCrawl: movie.openingCrawl,
      director: movie.director,
      producers: movie.producers.split(","),
      releaseDate: movie.releaseDate,
    };

    return response;
  }
}

module.exports = OutputFormatter;
