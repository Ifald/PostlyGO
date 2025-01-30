const Joi = require("joi");

// Схема для регистрации пользователя
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Имя пользователя должно быть строкой",
    "string.empty": "Имя пользователя не может быть пустым",
    "string.min": "Имя пользователя должно содержать минимум 3 символа",
    "any.required": "Имя пользователя обязательно",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Неверный формат email",
    "any.required": "Email обязателен",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Пароль должен содержать минимум 6 символов",
    "any.required": "Пароль обязателен",
  }),
});

module.exports = { registerSchema };
