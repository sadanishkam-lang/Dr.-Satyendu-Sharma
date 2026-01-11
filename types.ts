export interface Verse {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  audioUrl?: string; // Optional URL for audio file
  imageUrl?: string; // Optional URL for the verse image
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AudioState {
  isPlaying: boolean;
  progress: number;
  duration: number;
}