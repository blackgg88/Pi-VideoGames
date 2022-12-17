const { Videogame, Genre, Platform } = require("../db");

const { API_KEY } = require("../../config");
const fetch = require("node-fetch");

const getVideoGames = async (name) => {
  //***************TRAEMOS LOS JUEGOS GUARDADOS EN LA BD***************************/
  let gamesByDb = await Videogame.findAll({
    include: [{ model: Genre }, { model: Platform }],
  });

  if (gamesByDb.length > 0) {
    gamesByDb = JSON.stringify(gamesByDb);
    gamesByDb = JSON.parse(gamesByDb);

    gamesByDb = gamesByDb.map((game) => {
      return {
        ...game,
        genres: game.genres.map((gen) => gen.name),
        platforms: game.platforms.map((pl) => pl.name),
      };
    });
  }

  //*****************SI ENVIARON UN name COMO ARGUMENTO************************/
  if (name) {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );

    const data = await response.json();

    const gamesByDbSearch = gamesByDb.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );

    if (!data.count && !gamesByDbSearch.length)
      throw new Error(`Error, game not found: ${name}`);

    const gamesByApi = data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        release_date: game.released,
        genres: game.genres.map((gen) => gen.name),
        platforms: game.platforms.map((pl) => pl.platform.name),
      };
    });

    const allGames = [...gamesByDbSearch, ...gamesByApi];

    return allGames.splice(0, 15);
  }

  //*******************RETORNA TODOS LOS JUEGOS DE LA API************************ */
  const pages = 3;

  let allGames = [...gamesByDb];

  let response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);

  for (let i = 0; i <= pages; i++) {
    const data = await response.json();

    const gamesByApi = data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        release_date: game.released,
        genres: game.genres.map((gen) => gen.name),
        platforms: game.platforms.map((pl) => pl.platform.name),
      };
    });

    response = await fetch(data.next);

    allGames = [...allGames, ...gamesByApi];
  }

  return allGames;
};

module.exports = getVideoGames;
