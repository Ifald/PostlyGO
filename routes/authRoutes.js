const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Маршрут для реєстрації
router.post("/register", registerUser);

// Маршрут для авторизації
router.post("/login", loginUser);

module.exports = router;
