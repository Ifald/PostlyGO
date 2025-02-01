const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Підписатися на користувача
router.post("/:userId/follow", authMiddleware, followUser);

// Відписатися від користувача
router.post("/:userId/unfollow", authMiddleware, unfollowUser);

module.exports = router;
