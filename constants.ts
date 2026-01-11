import { Verse } from './types';

export const INITIAL_VERSE: Verse = {
  id: '1.1',
  chapter: 1,
  verse: 1,
  sanskrit: `धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । 
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ।।`,
  transliteration: `dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |
māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ||`,
  translation: `Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?`,
  // In a real scenario, these would point to the uploaded files. 
  // For this demo, we use the image from the prompt (symbolically) and a placeholder audio logic.
  imageUrl: "https://picsum.photos/seed/gita1/800/600", 
  audioUrl: "" // Empty string signifies we need to handle file selection or use a default
};

export const GEMINI_SYSTEM_INSTRUCTION = `You are a knowledgeable spiritual guide and scholar of the Bhagavad Gita. 
Your goal is to explain verses with depth, clarity, and historical context. 
Keep your answers concise but profound. 
When asked about a specific verse, analyze the Sanskrit words, the emotional state of the characters, and the philosophical implications.`;
