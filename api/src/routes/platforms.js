const { Router } = require("express");
const platformController = require("../controllers/platformController");

const router = Router();

router.get("/", platformController.getPlatforms);

router.get("/:name", platformController.getPlatformByName);

router.put("/", platformController.putPlatform);

router.post("/", platformController.postPlatform);

router.delete("/", platformController.deletePlatform);

module.exports = router;
