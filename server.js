const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes"); // Додано для лайків
const notificationRoutes = require("./routes/notificationRoutes");
const followRoutes = require("./routes/followRoutes");
const messageRoutes = require("./routes/messageRoutes");
const searchRoutes = require("./routes/searchRoutes");

dotenv.config();

const app = express();

// Підключення до бази даних
connectDB();

// Middleware
app.use(express.json());

// Маршрути
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes); // Додано для лайків
app.use("/api/notifications", notificationRoutes);
app.use("/api/follows", followRoutes); // Змінено базовий шлях для підписок
app.use("/api/messages", messageRoutes); // Додаємо маршрути повідомлень
app.use("/api/search", searchRoutes); // Додаємо маршрути пошуку

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});
