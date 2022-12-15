const PORT = process.env.PORT || 3001;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
const DB_NAME = process.env.DB_NAME || "videogames";

const API_KEY = process.env.API_KEY || "1f4f99f44d164059b8bd00c68d7874a4";

module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, API_KEY, DB_NAME };
