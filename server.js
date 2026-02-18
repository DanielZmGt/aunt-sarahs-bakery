import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});
app.use(cors());
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// System Instruction
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

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is missing in .env file");
}
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION
});

// API Routes
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Format history for Gemini API
        const formattedHistory = (history || []).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        // Start chat session with primary model (2.5-flash)
        const chat = model.startChat({
            history: formattedHistory,
        });

        try {
            const result = await chat.sendMessage(message);
            const response = await result.response;
            const text = response.text();
            return res.json({ text });
        } catch (error) {
            // Check for Rate Limit (429)
            if (error.message.includes('429') || error.status === 429) {
                console.warn('⚠️ Quota exceeded for gemini-2.5-flash. Falling back to gemini-1.5-flash.');

                // Fallback Model
                const modelFallback = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                    systemInstruction: SYSTEM_INSTRUCTION
                });

                const chatFallback = modelFallback.startChat({
                    history: formattedHistory,
                });

                const resultFallback = await chatFallback.sendMessage(message);
                const responseFallback = await resultFallback.response;
                const textFallback = responseFallback.text();
                return res.json({ text: textFallback, info: 'Served by fallback model' });
            }
            throw error; // Re-throw other errors
        }

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
    console.log(`Catch-all hit for url: ${req.url}`);
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send(err.message);
        }
    });
});

// Start server if main module
if (import.meta.url === `file://${process.argv[1]}`) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
