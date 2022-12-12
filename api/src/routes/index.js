const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreRouter = require("./genres");
const platformRouter = require("./platforms");
const videoGamesRouter = require("./videogames");
const videoGameRouter = require("./videogame");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genreRouter);
router.use("/platforms", platformRouter);
router.use("/videogames", videoGamesRouter);
router.use("/videogame", videoGameRouter);

module.exports = router;
