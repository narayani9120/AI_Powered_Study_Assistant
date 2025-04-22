const QuizResult = require("../Models/Result");

exports.storeQuizResult = async (req, res) => {
  try {
    const {
      userId,
      pdfId,
      type: rawType,
      answers,
      difficulty: rawDifficulty,
    } = req.body;
    
    const difficulty  = rawDifficulty?.toLowerCase();
    // Fix for percentage NaN
    const correctAnswers = Number(req.body.correctAnswers);
    const totalQuestions = Number(req.body.totalQuestions);
    const percentage = totalQuestions > 0
      ? Number(((correctAnswers / totalQuestions) * 100).toFixed(1))
      : 0;
    const wrongAnswers = totalQuestions - correctAnswers;

    // Fix for enum type issue
    const validTypes = ["quiz", "true_false", "flashcard"];
    const type = validTypes.includes(rawType) ? rawType : "quiz"; // fallback default

    // Ensure required fields are present
    if (!userId || !pdfId || !type || !difficulty) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields (userId, pdfId, or type).",
      });
    }

    const newResult = new QuizResult({
      userId,
      pdfId,
      type,
      difficulty,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      percentage,
      answers,
    });

    await newResult.save();
    res.status(201).json({ success: true, result: newResult });
  } catch (error) {
    console.error("Error storing quiz result:", error);
    res.status(500).json({ success: false, error: "Failed to store result" });
  }
};



exports.getUserResults = async (req, res) => {
  try {
    const userId = req.user.user_id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const results = await QuizResult.find({ userId })
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ success: false, message: "Failed to fetch results" });
  }
};

