const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "yourSecretKey"; // Секретний ключ з .env або стандартний

// Функція для створення токена
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1d" }); // Термін дії токена: 1 день
};

// Функція для перевірки токена
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
