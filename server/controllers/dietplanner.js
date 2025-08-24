// controllers/dietPlan.controller.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

// It's highly recommended to load your API key from environment variables
// For example: const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI('AIzaSyCkscHHCkSHJhdKI5_-SiPPxGL6icnXirU'); 
exports.generateDietPlan = async (req, res) => {
    try {
        // Destructure user_data, message, and tenYearRiskPercent from the request body
        const { user_data, message, tenYearRiskPercent } = req.body;

        // Basic validation to ensure required data is present
        if (!user_data || !message || !tenYearRiskPercent) {
            let missingParams = [];
            if (!user_data) missingParams.push('user_data');
            if (!message) missingParams.push('message');
            if (!tenYearRiskPercent) missingParams.push('tenYearRiskPercent');

            return res.status(400).json({
                message: `Bad Request: Missing required parameters: ${missingParams.join(', ')}`,
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Using a powerful model for better reasoning
            systemInstruction: `
                You are an expert AI Nutrition Assistant. Your primary goal is to generate a personalized, heart-healthy, 1-day sample diet plan based on user data and risk assessment.

                **Your Instructions:**

                1.  **Analyze User Data:** You will receive a JSON object with the user's health data (age, sex, race, cholesterol, blood pressure, etc.), a 10-year heart disease risk percentage, and a message. You MUST use all relevant data points to tailor your recommendations.

                2.  **Acknowledge Risk Factors:** In your introduction, briefly and gently mention the user's specific risk factors reflected in the data (e.g., "Given your blood pressure and cholesterol levels, and a risk assessment of X%...") and explain that the diet plan is designed to help manage these areas.

                3.  **Create a Structured Diet Plan:** Organize the plan into the following sections:
                    - **Breakfast**
                    - **Lunch**
                    - **Dinner**
                    - **Snacks (1-2 options)**

                4.  **Provide Specific Food Suggestions:** For each meal, suggest 2-3 specific and easy-to-prepare food options. DO NOT just list macronutrients (e.g., instead of "30g protein," say "a grilled chicken breast (about the size of your palm)"). Be practical.

                5.  **Consider Ethnicity/Race:** If the user's race is provided, try to include culturally relevant and accessible food suggestions where appropriate, while always prioritizing heart-healthy principles (e.g., DASH or Mediterranean diet principles).

                6.  **Maintain a Supportive Tone:** Be encouraging, positive, and non-judgmental.

                7.  **CRITICAL SAFETY DISCLAIMER:** You MUST begin EVERY response with the following disclaimer, enclosed in a prominent block. This is non-negotiable.

                    ---
                    **⚠️ Important Disclaimer:** I am an AI assistant and not a medical professional. This diet plan is a general suggestion based on the data you provided. It is not a substitute for professional medical or dietary advice. Please consult with a registered dietitian or your doctor before making any significant changes to your diet, especially with your health profile.
                    ---
            `,
        });

        // Combine the user data and their message into a clear prompt for the model
        const prompt = `
            Here is the user's health data:
            ${JSON.stringify(user_data, null, 2)}

            Here is the user's 10-year heart disease risk percentage:
            ${tenYearRiskPercent}

            Here is the user's request:
            "${message}"

            Please generate the diet plan based on these details.
        `;

        const result = await model.generateContent(prompt);
        const output = await result.response.text();

        res.status(200).json({ dietPlan: output });


    } catch (err) {
        console.error("Error in Diet Plan Generation:", err);
        res.status(500).json({ message: "An error occurred while generating the diet plan.", error: err.message, stack: err.stack });
    }
};