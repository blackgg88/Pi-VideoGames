const platformService = require("../services/platformService");

const getPlatforms = async (req, res) => {
  try {
    const allPlatforms = await platformService.getPlatforms();

    res.status(200).json(allPlatforms);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const getPlatformByName = async (req, res) => {
  try {
    const { name } = req.params;

    const platform = await platformService.getPlatformByName(name);

    res.status(200).json(platform);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const putPlatform = async (req, res) => {
  try {
    const { id, name } = req.query;

    const platformUpdated = await platformService.putPlatform(id, name);

    res.status(200).json(platformUpdated);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const postPlatform = async (req, res) => {
  try {
    const { name } = req.query;

    const platformCreated = await platformService.postPlatform(name);

    res.status(201).json(platformCreated);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

const deletePlatform = async (req, res) => {
  try {
    const { id } = req.query;

    const platformDeleted = await platformService.deletePlatform(id);

    res.status(200).json(platformDeleted);
  } catch (err) {
    res.status(err?.status || 500).json(err.message);
  }
};

module.exports = {
  getPlatforms,
  getPlatformByName,
  putPlatform,
  postPlatform,
  deletePlatform,
};
