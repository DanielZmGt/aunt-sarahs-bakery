import { ChatMessage } from "../types";

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    // Call our SECURE serverless backend instead of Google directly
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.text || "I'm sorry, I'm having trouble checking the oven right now.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Oh dear, it seems I've dropped a whisk. Could you please ask that again?";
  }
};
