# Aunt Sarah's Bakery & Chef Services

Handcrafted baked goods and private chef services.

## Security & Deployment

This project uses a secure serverless backend to protect the Gemini API Key.

### 1. Local Setup
1. Get an API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a `.env.local` file in this directory.
3. Add your key: `GEMINI_API_KEY=your_key_here`.
4. Install dependencies: `npm install`.
5. Run the app: `npm run dev`.

### 2. GitHub & Vercel Deployment
1. Push this repository to GitHub.
2. Connect your repo to **Vercel** (the standard for serverless functions).
3. In Vercel, go to **Settings > Environment Variables**.
4. Add `GEMINI_API_KEY` with your key value.
5. Vercel will automatically host the `api/chat.js` function and your website securely.
