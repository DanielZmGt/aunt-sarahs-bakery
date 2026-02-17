# Aunt Sarah's Bakery & Chef Services

An artisanal bakery and private chef service platform, featuring a React-based frontend and a secure serverless backend integrated with Google Gemini AI.

## 🚀 Features

- **Artisanal Menu**: Browse a wide range of handcrafted baked goods and cakes.
- **Private Chef Services**: Learn about and book exclusive culinary experiences.
- **AI Assistant**: Interact with "Aunt Sarah," an AI powered by Gemini 1.5 Flash, for culinary advice and order assistance.
- **Secure Architecture**: Serverless backend proxy to protect API credentials and prevent sensitive information leaks.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini SDK
- **Deployment**: Vercel (recommended for Serverless Functions)

## 🔐 Security & Community Standards

This project adheres to professional security standards:
- **API Protection**: The Gemini API key is never exposed to the client. All AI requests are proxied through a secure `/api/chat` serverless function.
- **Environment Management**: sensitive keys are managed via `.env` files (locally) and Repository Secrets (production).
- **History Privacy**: Chat history is kept in-memory and not logged or stored.

## 💻 Local Development

### Prerequisites
- Node.js (Latest LTS recommended)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Deploying to Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Import the repository into the [Vercel Dashboard](https://vercel.com).
3. In **Project Settings > Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: `your_actual_api_key`
4. Deploy. Vercel will automatically detect the `/api` directory and host your serverless functions.

## 📄 License

This project is private and intended for internal use.
