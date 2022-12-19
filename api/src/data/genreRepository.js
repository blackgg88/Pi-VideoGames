const { Genre } = require("./db");
const { API_KEY } = require("../../config");
const fetch = require("node-fetch");

const getGenres = async () => {
  try {
    let genresByDb = await Genre.findAll();

    if (genresByDb.length) return genresByDb;

    const response = await fetch(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    const data = await response.json();

    data.results.map((genre) =>
      Genre.findOrCreate({ where: { name: genre.name } })
    );

    genresByDb = await Genre.findAll();

    return genresByDb;
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const getGenreByName = async (name) => {
  try {
    const genresByDb = await Genre.findAll();

    const genre = genresByDb.filter((genre) => genre.name === name);

    if (!genre.length) throw { status: 404, message: "Genre not found" };

    return genre[0];
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const putGenre = async (id, name) => {
  try {
    const genre = await Genre.findByPk(id);

    if (!genre) throw { status: 404, message: "Genre not found" };

    await Genre.update({ name }, { where: { id } });

    return "Genre updated successfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const postGenre = async (name) => {
  try {
    const genre = await Genre.findOne({ where: { name } });

    if (genre) throw { status: 400, message: "Genre already exists" };

    await Genre.create({ name });

    return "Genre created correctly";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const deleteGenre = async (id) => {
  try {
    const genre = await Genre.findByPk(id);

    if (!genre) throw { status: 404, message: "Genre not found" };

    await genre.destroy();

    return "Genre removed successfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

module.exports = {
  getGenres,
  getGenreByName,
  putGenre,
  postGenre,
  deleteGenre,
};
