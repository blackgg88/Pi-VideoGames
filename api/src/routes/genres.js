const { Router } = require("express");
const router = Router();
const {
  getGenres,
  putGenre,
  postGenre,
  deleteGenre,
} = require("../controllers/genres");

router.get("/", async (req, res) => {
  try {
    const genres = await getGenres();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { id, name } = req.query;
    const updateGenre = await putGenre(id, name);

    res.status(200).json(updateGenre);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.query;
    const genreCreated = await postGenre(name);

    res.status(200).json(genreCreated);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;

    const destroyGenre = await deleteGenre(id);

    res.status(200).json(destroyGenre);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
