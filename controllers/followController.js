const User = require("../models/userModel");

exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

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

    if (!currentUser.following.includes(userId)) {
      currentUser.following.push(userId);
      await currentUser.save();
    }

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      await userToFollow.save();
    }

    res.status(200).json({ message: "Ви успішно підписалися." });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера.", error });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "Користувача не знайдено." });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userId
    );
    await currentUser.save();

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    await userToUnfollow.save();

    res.status(200).json({ message: "Ви успішно відписалися." });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера.", error });
  }
};
