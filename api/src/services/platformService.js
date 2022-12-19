const platformRepository = require("../data/platformRepository");

const getPlatforms = async () => {
  try {
    const allPlatforms = await platformRepository.getPlatforms();

    return allPlatforms;
  } catch (err) {
    throw err;
  }
};

const getPlatformByName = async (name) => {
  try {
    const platform = await platformRepository.getPlatformByName(name);

    return platform;
  } catch (err) {
    throw err;
  }
};

const putPlatform = async (id, name) => {
  try {
    const platformUpdated = await platformRepository.putPlatform(id, name);

    return platformUpdated;
  } catch (err) {
    throw err;
  }
};

const postPlatform = async (name) => {
  try {
    const platformCreated = await platformRepository.postPlatform(name);

    return platformCreated;
  } catch (err) {
    throw err;
  }
};

const deletePlatform = async (id) => {
  try {
    const platformDeleted = await platformRepository.deletePlatform(id);

    return platformDeleted;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getPlatforms,
  getPlatformByName,
  putPlatform,
  postPlatform,
  deletePlatform,
};
