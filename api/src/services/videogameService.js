const videogameRepository = require("../data/videogameRepository");

const getVideogames = async (name) => {
  try {
    if (name) {
      const videogames = await videogameRepository.getVideogameByName(name);

      return videogames;
    }

    const videogames = await videogameRepository.getVideogames();

    return videogames;
  } catch (err) {
    throw err;
  }
};

const getVideogameByID = async (id) => {
  try {
    const videogame = await videogameRepository.getVideogameByID(id);

    return videogame;
  } catch (err) {
    throw err;
  }
};

const postVideogame = async (videogame) => {
  try {
    const videogameCreated = await videogameRepository.postVideogame(videogame);

    return videogameCreated;
  } catch (err) {
    throw err;
  }
};

const putVideogame = async (id, rating) => {
  try {
    const videogameUpdated = await videogameRepository.putVideogame(id, rating);

    return videogameUpdated;
  } catch (err) {
    throw err;
  }
};

const deleteVideogame = async (id) => {
  try {
    const videogameDeleted = await videogameRepository.deleteVideogame(id);

    return videogameDeleted;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getVideogames,
  getVideogameByID,
  postVideogame,
  putVideogame,
  deleteVideogame,
};
