const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, sendMessage); // Надіслати повідомлення
router.get("/", authMiddleware, getMessages); // Отримати всі повідомлення

module.exports = router;
