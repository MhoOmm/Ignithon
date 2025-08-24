const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCkscHHCkSHJhdKI5_-SiPPxGL6icnXirU"); 

const problemchat = async (req, res) => {
    try {
        const { message } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
                You are a supportive health assistant. 
                A user will come to you with their problems, symptoms, or concerns. 
                Your job is to:

                1. Understand the user’s query and identify if it is related to:
                - **Physical health needs** (like fever, injuries, chest pain, persistent cough, etc.)  
                - **Mental health or emotional concerns** (like stress, anxiety, depression, loneliness, motivation, relationship worries, etc.)

                2. If it seems like a **physical health issue**, politely suggest that the user should consult a qualified doctor. 
                - Example: "It seems like this may require medical attention. I recommend consulting a doctor."

                3. If it seems like a **mental or emotional concern**, provide empathetic and supportive responses as an **AI mental health buddy**. 
                - Example: give encouragement, coping strategies, or gentle advice to manage emotions. 
                - You are not a replacement for therapy, so if the issue sounds very serious (like self-harm or suicidal thoughts), advise the user to seek immediate help from a professional or helpline.

                4. Always stay kind, non-judgmental, and concise. 
                5. Do not give medical prescriptions or exact diagnoses. Only recommend whether the user should see a **doctor** or continue talking to the **AI buddy**.
                `


        });

        const result = await model.generateContent(message);
        const output = await result.response.text();

        res.status(200).json({ reply: output });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in the Mental Health Buddy API" });
    }
};

module.exports = { problemchat };
