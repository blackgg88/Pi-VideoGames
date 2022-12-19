const { Platform } = require("./db");
const { getVideogames } = require("../services/videogameService");

const getPlatforms = async () => {
  try {
    let platformsByDb = await Platform.findAll();

    if (platformsByDb.length) return platformsByDb;

    const videogames = await getVideogames();

    videogames.map((videogame) =>
      videogame.platforms.map((platform) =>
        Platform.findOrCreate({ where: { name: platform } })
      )
    );

    platformsByDb = await Platform.findAll();

    return platformsByDb;
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const getPlatformByName = async (name) => {
  try {
    const platformsByDb = await Platform.findAll();

    const platform = platformsByDb.filter((platform) => platform.name === name);

    if (!platform.length) throw { status: 404, message: "Platform not found" };

    return platform[0];
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const putPlatform = async (id, name) => {
  try {
    const platform = await Platform.findByPk(id);

    if (!platform) throw { status: 404, message: "Platform not found" };

    await Platform.update({ name }, { where: { id } });

    return "Platform updated successfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const postPlatform = async (name) => {
  try {
    const platform = await Platform.findOne({ where: { name } });

    if (platform) throw { status: 400, message: "Platform already exists" };

    await Platform.create({ name });

    return "Platform created successfully";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

const deletePlatform = async (id) => {
  try {
    const platform = await Platform.findByPk(id);

    if (!platform) throw { status: 404, message: "Platform not found" };

    await platform.destroy();

    return "Platform successfully deleted";
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

module.exports = {
  getPlatforms,
  getPlatformByName,
  putPlatform,
  postPlatform,
  deletePlatform,
};
