const { Videogame, Genre, Platform } = require("../db");

const { API_KEY } = require("../../config");

const fetch = require("node-fetch");

const getVideogame = async (idVideogame) => {
  if (idVideogame && idVideogame.includes("-")) {
    let videogameByDb = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: [
        { model: Genre, through: { attributes: [] } },
        { model: Platform, through: { attributes: [] } },
      ],
    });

    if (!videogameByDb) throw new Error("Error, Videogame not found");

    videogameByDb = JSON.stringify(videogameByDb);
    videogameByDb = JSON.parse(videogameByDb);

    videogameByDb.genres = videogameByDb.genres.map((gen) => gen.name);
    videogameByDb.platforms = videogameByDb.platforms.map((pl) => pl.name);

    return videogameByDb;
  }

  const response = await fetch(
    `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
  );

  const data = await response.json();

  if (!data.id) throw new Error("Error, Videogame not found");

  const game = {
    id: data.id,
    name: data.name,
    description: data.description,
    release_date: data.released,
    rating: data.rating,
    image: data.background_image,
    genres: data.genres.map((gen) => gen.name),
    platforms: data.parent_platforms.map((pl) => pl.platform.name),
  };

  return game;
};

const postVideogame = async (videogame) => {
  const { name, description, image, release_date, rating, genres, platforms } =
    videogame;

  if (!name || !description || !platforms) throw new Error("Missing data");

  const searchGame = await Videogame.findOne({ where: { name } });

  if (searchGame) throw new Error("The game already exists");

  const gameCreated = await Videogame.create({
    name,
    description,
    image,
    release_date,
    rating,
  });

  const genresSearch = await Genre.findAll({
    where: {
      name: genres,
    },
  });

  platforms.map((pl) => Platform.findOrCreate({ where: { name: pl } }));

  const platformsSearch = await Platform.findAll({
    where: {
      name: platforms,
    },
  });

  await gameCreated.addGenres(genresSearch);
  await gameCreated.addPlatforms(platformsSearch);

  return "Videogame created succesfully";
};

const putVideogame = async (id, rating) => {
  //Comprobar que sea de la DB
  if (!id.includes("-"))
    throw new Error("Error, invalid ID, this Videogame cannot be modified");

  await Videogame.update({ rating }, { where: { id } });

  return "Videogame updated successfully";
};

const deleteVideogame = async (id) => {
  //Comprobar que sea de la DB
  if (!id.includes("-"))
    throw new Error("Error, invalid ID, this Videogame cannot be delete");

  const game = await Videogame.findOne({ where: { id } });

  game.destroy();

  return "Videogame deleted successfully";
};

module.exports = { getVideogame, postVideogame, putVideogame, deleteVideogame };
