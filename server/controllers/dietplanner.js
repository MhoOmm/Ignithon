const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCkscHHCkSHJhdKI5_-SiPPxGL6icnXirU');

exports.generateDietPlan = async (req, res) => {
    try {
        const { user_data, message } = req.body;

        if (!user_data || !message) {

            let missingParams = [];
            if (!user_data) missingParams.push('user_data');
            if (!message) missingParams.push('message');

            return res.status(400).json({
                message: `Bad Request: Missing required parameters: ${missingParams.join(', ')}`,
            });
        }

        const model = genAI.getGenerativeModel({

            model: "gemini-1.5-flash",

 
            systemInstruction: `
                You are an expert AI Nutrition Assistant. Your task is to generate a personalized, 
                heart-healthy **1-day diet plan** based on user health data and risk assessment.

                --- Guidelines ---
                1. **Risk Context**: Begin with a short, gentle introduction mentioning the user's 
                   key risk factors (e.g., cholesterol, blood pressure, age, or risk percentage).
                
                2. **Diet Plan Sections**: Clearly separate the plan into these headings:
                   - Breakfast
                   - Lunch
                   - Dinner
                   - Snacks (1–2 options)
                
                3. **Paragraph-Wise Presentation**: 
                   Write in **separate, short paragraphs** for each section. 
                   Each meal/snack should be described in 2–3 practical options, 
                   written in natural language. Do NOT return a single block of text.

                4. **Practical Food Suggestions**: Give real food examples 
                   (e.g., “a bowl of oatmeal topped with sliced almonds” instead of 
                   “30g carbs + 10g protein”).
                
                5. **Cultural Relevance**: If race/ethnicity is provided, adapt food suggestions 
                   to be culturally familiar while maintaining heart-healthy principles.

                6. **Tone**: Always be supportive, encouraging, and non-judgmental.

                --- Output Format ---
                Present the diet plan guidelines as a list.
                Use markdown formatting for lists.
            `,
        });

        const prompt = `
            Here is the user's health data:
            ${JSON.stringify(user_data, null, 2)}

            Here is the user's request:
            "${message}"

            Please generate the diet plan in **separate, well-structured paragraphs**.
        `;

        const result = await model.generateContent(prompt);
        const output = await result.response.text();

        res.status(200).json({ dietPlan: output });

    } catch (err) {
        console.error("Error in Diet Plan Generation:", err);
        res.status(500).json({
            message: "An error occurred while generating the diet plan.",
            error: err.message,
            stack: err.stack,
        });
    }
};
