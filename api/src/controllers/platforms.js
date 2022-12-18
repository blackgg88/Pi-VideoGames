//Importamos el Model de Plataform
const { Platform } = require("../db");
const { getVideoGames } = require("./videogames");

const getPlatforms = async () => {
  let platformsByDb = await Platform.findAll();

  if (platformsByDb.length) return platformsByDb;

  const videogames = await getVideoGames();

  videogames.map((videogame) => {
    videogame.platforms.map((pl) =>
      Platform.findOrCreate({ where: { name: pl } })
    );
  });

  platformsByDb = await Platform.findAll();

  return platformsByDb;
};

const getPlatformByName = async (name) => {
  let platformsByDb = await Platform.findAll();

  if (!platformsByDb.length) platformsByDb = await getPlatforms();

  const platform = platformsByDb.filter((pl) => pl.name === name);

  if (!platform.length) throw new Error("Platform not found");

  return platform[0];
};

const putPlatform = async (id, name) => {
  const platform = await Platform.findByPk(id);
  if (!platform) throw new Error("Platform not found");

  await Platform.update({ name }, { where: { id } });

  return "Platform updated successfully";
};

const postPlatform = async (name) => {
  const platform = await Platform.findOne({ where: { name } });
  if (platform) throw new Error("Platform already exists");

  await Platform.create({ name });

  return "Platform created correctly";
};
const deletePlatform = async (id) => {
  const platform = await Platform.findByPk(id);

  if (!platform) throw new Error("Platform not found");

  platform.destroy();

  return "Platform successfully removed";
};
module.exports = {
  getPlatforms,
  getPlatformByName,
  putPlatform,
  postPlatform,
  deletePlatform,
};
