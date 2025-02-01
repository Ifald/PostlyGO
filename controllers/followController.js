const User = require("../models/userModel");

// Підписатися на користувача
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID користувача, на якого підписуються
    const currentUserId = req.user.id; // ID поточного користувача

    if (userId === currentUserId) {
      return res
        .status(400)
        .json({ message: "Ви не можете підписатися на себе." });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "Користувача не знайдено." });
    }

    // Додати користувача до списку підписок
    if (!currentUser.following.includes(userId)) {
      currentUser.following.push(userId);
      await currentUser.save();
    }

    // Додати поточного користувача до списку підписників
    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      await userToFollow.save();
    }

    res
      .status(200)
      .json({
        message: "Ви успішно підписалися.",
        following: currentUser.following,
      });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера.", error });
  }
};

// Відписатися від користувача
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID користувача, від якого відписуються
    const currentUserId = req.user.id; // ID поточного користувача

    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "Користувача не знайдено." });
    }

    // Видалити користувача зі списку підписок
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userId
    );
    await currentUser.save();

    // Видалити поточного користувача зі списку підписників
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    await userToUnfollow.save();

    res
      .status(200)
      .json({
        message: "Ви успішно відписалися.",
        following: currentUser.following,
      });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера.", error });
  }
};
