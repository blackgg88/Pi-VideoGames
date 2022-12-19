const { Router } = require("express");
const router = Router();
const videogameController = require("../controllers/videogameController");

router.get("/:id", videogameController.getVideogameByID);

router.post("/", videogameController.postVideogame);

router.put("/:id", videogameController.putVideogame);

router.delete("/:id", videogameController.deleteVideogame);

module.exports = router;
