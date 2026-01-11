import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

export const initializeGenAI = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const getVerseExplanation = async (verseText: string, contextQuestion?: string): Promise<string> => {
  const ai = initializeGenAI();
  if (!ai) {
    return "Please configure your API Key to receive AI insights.";
  }

  const prompt = contextQuestion 
    ? `Regarding this verse: "${verseText}", user asks: ${contextQuestion}` 
    : `Please provide a brief but insightful explanation of this Bhagavad Gita verse: "${verseText}". Focus on the key themes and meaning.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I could not generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the spirit guide.";
  }
};