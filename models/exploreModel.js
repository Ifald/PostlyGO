const mongoose = require("mongoose");

const exploreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String], // Теги для пошуку
  views: {
    type: Number,
    default: 0, // Лічильник переглядів
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Explore = mongoose.model("Explore", exploreSchema);

module.exports = Explore;
