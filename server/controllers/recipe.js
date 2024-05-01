const axios = require("axios");
const Recipe = require("../models/Recipe");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

// Function to generate recipe recommendations based on user input using Gemini API
exports.generateRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return res
        .status(400)
        .json({ message: "Ingredients must be provided as an array" });
    }

    // Call Gemini API to generate recipe recommendations
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({ history: ingredients });
    const result = await chat.sendMessage(
      "What recipes can I make with these ingredients?"
    );
    const response = await result.response;
    const recipes = response.text();

    // Save recipe recommendations to the database if required

    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error generating recipes:", error);
    res.status(500).json({ message: "Error generating recipes" });
  }
};

// Function to save favorite recipes
exports.saveFavoriteRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, imageUrl } = req.body;
    const userId = req.user.id;

    // Create a new Recipe instance
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      imageUrl,
      user: userId,
    });

    // Save the recipe to the database
    await recipe.save();

    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Error saving recipe" });
  }
};
