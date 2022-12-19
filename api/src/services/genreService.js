const genreRepository = require("../data/genreRepository");

const getGenres = async () => {
  try {
    const allGenres = await genreRepository.getGenres();

    return allGenres;
  } catch (err) {
    throw err;
  }
};

const getGenreByName = async (name) => {
  try {
    const genre = await genreRepository.getGenreByName(name);

    return genre;
  } catch (err) {
    throw err;
  }
};

const putGenre = async (id, name) => {
  try {
    const genreUpdated = await genreRepository.putGenre(id, name);

    return genreUpdated;
  } catch (err) {
    throw err;
  }
};

const postGenre = async (name) => {
  try {
    const genreCreated = await genreRepository.postGenre(name);

    return genreCreated;
  } catch (err) {
    throw err;
  }
};

const deleteGenre = async (id) => {
  try {
    const genreDeleted = await genreRepository.deleteGenre(id);

    return genreDeleted;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getGenres,
  getGenreByName,
  putGenre,
  postGenre,
  deleteGenre,
};
