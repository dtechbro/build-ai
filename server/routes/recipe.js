const express = require("express");
const router = express.Router();

router.post("/generate", async (req, res) => {
  const model = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

  const chat = model.startChat({
    history: req.body.history,
  });

  const message = req.body.message;

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});

module.exports = router;
