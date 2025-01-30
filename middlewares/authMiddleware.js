const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Получение токена из заголовка Authorization
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Убираем 'Bearer ' из токена
    const token = authHeader.replace("Bearer ", "");

    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Сохраняем информацию о пользователе в объекте req
    req.user = decoded;

    // Переходим к следующему middleware
    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
