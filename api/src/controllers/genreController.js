const genreService = require("../services/genreService");

const getGenres = async (req, res) => {
  try {
    const genres = await genreService.getGenres();

    res.status(200).json(genres);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const getGenreByName = async (req, res) => {
  try {
    const { name } = req.params;

    const genre = await genreService.getGenreByName(name);

    res.status(200).json(genre);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const putGenre = async (req, res) => {
  try {
    const { id, name } = req.query;

    const genreUpdated = await genreService.putGenre(id, name);

    res.status(200).json(genreUpdated);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const postGenre = async (req, res) => {
  try {
    const { name } = req.query;

    const genreCreated = await genreService.postGenre(name);

    res.status(201).json(genreCreated);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.query;

    const genreDeleted = await genreService.deleteGenre(id);

    res.status(200).json(genreDeleted);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

module.exports = {
  getGenres,
  getGenreByName,
  putGenre,
  postGenre,
  deleteGenre,
};
