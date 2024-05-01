const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth");
// const recipeRoutes = require("./routes/recipe");
const connectToDatabase = require("./config/database");
app.use(
  cors({
    origin: ["http://localhost:300", "https://aleeyah-api.vercel.app/"],
  }),
);

const PORT = 8000;

const app = express();

connectToDatabase();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Assuming you have a valid API key stored in environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let currentChatSession; // Variable to store the chat session

app.use(
  cors({
    origin: ["https://aleeyah.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/auth", authRoutes);
// app.use("/recipes", recipeRoutes);

app.post("/recipes/generate", async (req, res) => {
  // Check if a chat session exists, otherwise create a new one
  if (!currentChatSession) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    currentChatSession = model.startChat({
      history: req.body.history,
    });
  }

  const message = req.body.message;

  // Use the existing chat session for subsequent requests
  const result = await currentChatSession.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});

app.listen(PORT, () => {
  console.log("Server running on local server", PORT);
});
