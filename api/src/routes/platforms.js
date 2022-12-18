const { Router } = require("express");
const {
  getPlatforms,
  getPlatformByName,
  putPlatform,
  postPlatform,
  deletePlatform,
} = require("../controllers/platforms");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const platforms = await getPlatforms();
    res.status(200).json(platforms);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const platform = await getPlatformByName(name);

    res.status(200).json(platform);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { id, name } = req.query;
    const updatePlatform = await putPlatform(id, name);

    res.status(200).json(updatePlatform);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.query;
    const platformCreated = await postPlatform(name);

    res.status(200).json(platformCreated);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;

    const destroyPlatform = await deletePlatform(id);

    res.status(200).json(destroyPlatform);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
