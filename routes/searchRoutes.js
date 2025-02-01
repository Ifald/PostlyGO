const express = require("express");
const { searchUsers } = require("../controllers/searchController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, searchUsers); // Пошук користувачів

module.exports = router;
