import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
// Using 2.0-flash-lite as it was seen in the available models list
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function run() {
    try {
        console.log("Testing gemini-flash-latest...");
        const result = await model.generateContent("Hello!");
        const response = await result.response;
        console.log("Response:", response.text());
        console.log("✅ gemini-2.0-flash-lite is working!");
    } catch (error) {
        console.error("⚠️ Test Failed:", error.message);
        process.exit(1);
    }
}

run();
