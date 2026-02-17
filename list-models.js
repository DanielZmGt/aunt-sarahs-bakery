import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envConfig = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([^=]+?)\s*=\s*(.*)?\s*$/);
    if (match) {
        envConfig[match[1]] = match[2];
    }
});

const apiKey = envConfig['GEMINI_API_KEY'];
if (!apiKey) {
    console.error("No API key found");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log(`Fetching models from: ${url.replace(apiKey, 'API_KEY')}`);

fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("Available Models:");
            (data.models || []).forEach(m => {
                console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
            });
        }
    })
    .catch(err => console.error("Fetch Error:", err));
