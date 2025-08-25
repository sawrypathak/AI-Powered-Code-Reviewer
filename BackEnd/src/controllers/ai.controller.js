import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  try {
    const { code } = req.body;
    console.log("👉 Received code:", code);

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await aiService(code);
    // console.log("👉 AI Service Response:", response);

    res.json({ success: true, data: response });
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).send("Internal Server Error");
  }
};


