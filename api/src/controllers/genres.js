//Importamos Model de Genre
const { Genre } = require("../db");
// require("dotenv").config();
// const { API_KEY } = process.env;
// const axios = require("axios");
const { API_KEY } = require("../../config");
const fetch = require("node-fetch");

const getGenres = async () => {
  let genresByDb = await Genre.findAll();

  if (genresByDb.length) {
    return genresByDb;
  }

  // const response = await axios.get(
  //   `https://api.rawg.io/api/genres?key=${API_KEY}`,
  //   {
  //     headers: { Accept: "application/json", "Accept-Encoding": "identity" },
  //     params: { trophies: true },
  //   }
  // );

  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

  const data = await response.json();

  data.results.forEach((currentGenre) => {
    Genre.findOrCreate({ where: { name: currentGenre.name } });
  });

  genresByDb = await Genre.findAll();

  return genresByDb;
};

const getGenreByName = async (name) => {
  let genresByDb = await Genre.findAll();

  if (!genresByDb.length) genresByDb = await getGenres();

  const genre = genresByDb.filter((gen) => gen.name === name);

  if (!genre.length) throw new Error("Genre not found");

  return genre[0];
};

const putGenre = async (id, name) => {
  const genre = await Genre.findByPk(id);

  if (!genre) throw new Error("Genre not found");

  await Genre.update({ name }, { where: { id } });

  return "Genre updated successfully";
};

const postGenre = async (name) => {
  const genre = await Genre.findOne({ where: { name } });
  if (genre) throw new Error("Genre already exists");

  await Genre.create({ name });

  return "Genre created correctly";
};
const deleteGenre = async (id) => {
  const genre = await Genre.findByPk(id);
  if (!genre) throw new Error("Genre not found");

  genre.destroy();

  return "Genre removed successfully";
};

module.exports = {
  getGenres,
  getGenreByName,
  putGenre,
  postGenre,
  deleteGenre,
};
