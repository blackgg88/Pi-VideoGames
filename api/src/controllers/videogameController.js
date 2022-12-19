const videogameService = require("../services/videogameService");

const getVideogames = async (req, res) => {
  try {
    const { name } = req.query;

    const videogames = await videogameService.getVideogames(name);

    res.status(200).json(videogames);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const getVideogameByID = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await videogameService.getVideogameByID(id);

    res.status(200).json(game);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const postVideogame = async (req, res) => {
  try {
    const videogame = req.body;

    const videogameCreated = await videogameService.postVideogame(videogame);

    res.status(200).json(videogameCreated);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const putVideogame = async (req, res) => {
  try {
    const { id } = req.params,
      { rating } = req.query;

    const videogameUpdated = await videogameService.putVideogame(id, rating);

    res.status(200).json(videogameUpdated);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;

    const videogameDeleted = await videogameService.deleteVideogame(id);

    res.status(200).json(videogameDeleted);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

module.exports = {
  getVideogames,
  getVideogameByID,
  postVideogame,
  putVideogame,
  deleteVideogame,
};
