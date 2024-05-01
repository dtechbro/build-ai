const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who saved the recipe
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
