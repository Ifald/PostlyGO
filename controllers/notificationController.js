const Notification = require("../models/notificationModel");

// Отримати всі сповіщення користувача
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};

// Оновити статус сповіщення (прочитане)
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Сповіщення не знайдено" });
    }

    if (notification.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Ви не маєте доступу до цього сповіщення" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Сповіщення оновлено", notification });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};
