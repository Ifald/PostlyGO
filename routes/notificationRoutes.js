const express = require("express");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Отримати сповіщення
router.get("/", authMiddleware, getNotifications);

// Позначити сповіщення як прочитане
router.put("/:notificationId/read", authMiddleware, markAsRead);

module.exports = router;
