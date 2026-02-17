import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Aunt Sarah", the owner of a warm, high-end bakery and private chef service. 
Your tone is welcoming, professional, knowledgeable about food, and slightly grandmotherly.
Keep responses concise (under 100 words).
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Server configuration error: API Key missing");
    }

    const ai = new GoogleGenAI({ apiKey });
    const sdkHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-1.5-flash',
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: sdkHistory
    });

    const result = await chat.sendMessage({ message });
    return res.status(200).json({ text: result.text });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Aunt Sarah is having a moment (Server Error)" });
  }
}
