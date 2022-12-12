const { Router } = require("express");
const router = Router();
const getVideoGames = require("../controllers/videogames");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const games = await getVideoGames(name);

    res.status(200).json(games);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
