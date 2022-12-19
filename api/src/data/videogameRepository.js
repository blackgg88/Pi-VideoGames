const { Videogame, Genre, Platform } = require("./db");
const { API_KEY } = require("../../config");
const fetch = require("node-fetch");

const getVideogamesByDb = async () => {
  try {
    let gamesByDb = await Videogame.findAll({
      include: [{ model: Genre }, { model: Platform }],
    });

    if (gamesByDb.length) {
      gamesByDb = JSON.stringify(gamesByDb);
      gamesByDb = JSON.parse(gamesByDb);

      gamesByDb = gamesByDb.map((game) => {
        return {
          ...game,
          genres: game.genres.map((genre) => genre.name),
          platforms: game.platforms.map((platform) => platform.name),
        };
      });
    }
    return gamesByDb;
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const getVideogamesByAPI = async () => {
  try {
    const totalPages = 5;

    let allGames = [];

    let response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);

    for (let i = 0; i < totalPages; i++) {
      const data = await response.json();

      const games = data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          rating: game.rating,
          release_date: game.released,
          genres: game.genres.map((genre) => genre.name),
          platforms: game.platforms.map((pl) => pl.platform.name),
        };
      });

      response = await fetch(data.next);

      allGames = [...allGames, ...games];
    }

    return allGames;
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const getVideogames = async () => {
  try {
    const gamesByDb = await getVideogamesByDb();

    const gamesByApi = await getVideogamesByAPI();

    return [...gamesByDb, ...gamesByApi];
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const getVideogameByName = async (name) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    const data = await response.json();

    let gamesByDb = await getVideogamesByDb();

    gamesByDb = gamesByDb.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );

    if (!data.count && !gamesByDb.length)
      throw { status: 400, message: `Error, game not found: ${name}` };

    const gamesByApi = data.results?.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        release_date: game.released,
        genres: game.genres?.map((genre) => genre.name),
        platforms: game.platforms?.map((pl) => pl.platform.name),
      };
    });

    const allGames = [...gamesByDb, ...gamesByApi];

    return allGames.splice(0, 15);
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const getVideogameByID = async (id) => {
  try {
    if (id.includes("-")) {
      let game = await Videogame.findOne({
        where: { id },
        include: [
          { model: Genre, through: { attributes: [] } },
          { model: Platform, through: { attributes: [] } },
        ],
      });

      if (!game) throw { status: 400, message: "Error, Videogame not found" };

      game = JSON.stringify(game);
      game = JSON.parse(game);

      game.genres = game.genres.map((genre) => genre.name);
      game.platforms = game.platforms.map((platform) => platform.name);

      return game;
    }

    const response = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    const data = await response.json();

    if (!data.id) throw { status: 400, message: "Error, Videogame not found" };

    const game = {
      id: data.id,
      name: data.name,
      description: data.description,
      release_date: data.released,
      rating: data.rating,
      image: data.background_image,
      genres: data.genres.map((genre) => genre.name),
      platforms: data.platforms.map((pl) => pl.platform.name),
    };

    return game;
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const postVideogame = async (videogame) => {
  try {
    const {
      name,
      description,
      image,
      release_date,
      rating,
      genres,
      platforms,
    } = videogame;

    if (!name || !description || !platforms)
      throw { status: 400, message: "Missing data" };

    const searchGame = await Videogame.findOne({ where: { name } });

    if (searchGame) throw { status: 400, message: "The game already exists" };

    const game = await Videogame.create({
      name,
      description,
      image,
      release_date,
      rating,
    });

    const genresSearch = await Genre.findAll({ where: { name: genres } });

    const platformsSearch = await Platform.findAll({
      where: { name: platforms },
    });

    await game.addGenres(genresSearch);
    await game.addPlatforms(platformsSearch);

    return "Videogame created succesfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const putVideogame = async (id, rating) => {
  try {
    if (!id.includes("-"))
      throw {
        status: 400,
        message: "Error, invalid ID, this Videogame cannot be modified",
      };

    await Videogame.update({ rating }, { where: { id } });

    return "Videogame updated successfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const deleteVideogame = async (id) => {
  try {
    if (!id.includes("-"))
      throw {
        status: 400,
        message: "Error, invalid ID, this Videogame cannot be delete",
      };

    const game = await Videogame.findOne({ where: { id } });

    await game.destroy();

    return "Videogame deleted successfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

module.exports = {
  getVideogames,
  getVideogameByName,
  getVideogameByID,
  postVideogame,
  putVideogame,
  deleteVideogame,
};
