const { Router } = require("express");
const router = Router();
const {
  getVideogame,
  postVideogame,
  putVideogame,
  deleteVideogame,
} = require("../controllers/videogame");

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;

  try {
    const game = await getVideogame(idVideogame);

    res.status(200).json(game);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const createdGame = await postVideogame(req.body);

    res.status(200).json(createdGame);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.put("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params,
      { rating } = req.query;

    const updateGame = await putVideogame(idVideogame, rating);

    res.status(200).json(updateGame);
  } catch (err) {
    res.json(err.message);
  }
});

router.delete("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;

    const destroyGame = await deleteVideogame(idVideogame);

    res.status(200).json(destroyGame);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
