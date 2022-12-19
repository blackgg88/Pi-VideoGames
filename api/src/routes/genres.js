const { Router } = require("express");
const router = Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getGenres);

router.get("/:name", genreController.getGenreByName);

router.put("/", genreController.putGenre);

router.post("/", genreController.postGenre);

router.delete("/", genreController.deleteGenre);

module.exports = router;
