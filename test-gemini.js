import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.resolve(process.cwd(), '.env');
console.log(`Reading .env from: ${envPath}`);

if (!fs.existsSync(envPath)) {
    console.error(".env file not found");
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
console.log(`File content length: ${envContent.length}`);

const envConfig = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([^=]+?)\s*=\s*(.*)?\s*$/);
    if (match) {
        envConfig[match[1]] = match[2];
    }
});

console.log("Environment keys found:", Object.keys(envConfig));

const apiKey = envConfig['GEMINI_API_KEY'];
if (!apiKey) {
    console.error("No API key found in .env (GEMINI_API_KEY missing)");
    process.exit(1);
}

const ai = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    { model: "gemini-2.5-flash", apiVersion: "v1beta" },
    { model: "gemini-2.0-flash-lite", apiVersion: "v1beta" },
];

async function testModels() {
    console.log("Testing available models...");

    for (const config of modelsToTest) {
        const modelName = config.model;
        const version = config.apiVersion;
        console.log(`\nTesting ${modelName} (${version})...`);
        try {
            const model = ai.getGenerativeModel({ model: modelName }, { apiVersion: version });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log(`✅ SUCCESS: ${modelName} (${version}) responded: ${response.text().slice(0, 50)}...`);
        } catch (error) {
            let msg = error.message || error;
            if (msg.includes('404')) msg = '404 - Model not found or not supported in this version';
            if (msg.includes('429')) msg = '429 - Rate Limit / Quota Exceeded';
            console.log(`❌ FAILED: ${modelName} (${version}) - ${msg}`);
        }
    }
}

testModels();
