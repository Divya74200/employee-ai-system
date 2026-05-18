import axios from "axios";

export const generateRecommendation = async (
  req,
  res
) => {
  try {
    const employeeData = req.body;

    const prompt = `
Analyze this employee and provide:

1. Promotion Recommendation
2. Training Suggestions
3. Performance Feedback
4. Employee Ranking

Employee Data:
${JSON.stringify(employeeData)}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },
      }
    );

    res.json({
      recommendation:
        response.data.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};