const multer = require("multer");
const path = require("path");

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/avatars"); // Папка для сохранения аватаров
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// Проверка типа файла
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png files are allowed!"));
  }
};

// Middleware для загрузки аватаров
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Максимальный размер файла — 5 MB
  fileFilter,
});

module.exports = upload;
