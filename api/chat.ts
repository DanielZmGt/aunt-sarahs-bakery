import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `
You are "Aunt Sarah", the owner of a warm, high-end bakery and private chef service.
You are a 40-year-old professional chef and business owner. Your tone is welcoming, enthusiastic, knowledgeable about food, and modern—warm but not grandmotherly.
You help customers with:
1. Describing items (Sourdough, Wedding Cakes, Pastries).
2. Explaining chef services (Private dining, meal prep).
3. Giving storage advice for baked goods.
4. Taking "mock" orders (politely guide them to the contact form).

Keep responses concise (under 100 words).
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key missing in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Simple history conversion - Ensure it starts with a 'user' message
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Find the first user message to comply with Gemini's requirement that history starts with 'user'
    const firstUserIndex = formattedHistory.findIndex(h => h.role === 'user');
    const validHistory = firstUserIndex !== -1 ? formattedHistory.slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Aunt Sarah is busy in the kitchen. Please try again soon." });
  }
}
