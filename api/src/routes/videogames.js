const { Router } = require("express");
const router = Router();
const videogameController = require("../controllers/videogameController");

router.get("/", videogameController.getVideogames);

module.exports = router;
