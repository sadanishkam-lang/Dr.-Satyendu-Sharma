import React, { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { getVerseExplanation } from '../services/geminiService';

interface ExplanationPanelProps {
  verseText: string;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ verseText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [question, setQuestion] = useState("");

  const handleAsk = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const result = await getVerseExplanation(verseText, question);
    setExplanation(result);
    setIsLoading(false);
    setQuestion(""); // Clear input after asking
  };

  const handleInitialExplain = async () => {
    setIsOpen(true);
    if (!explanation) {
        setIsLoading(true);
        const result = await getVerseExplanation(verseText);
        setExplanation(result);
        setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {!isOpen ? (
        <button
          onClick={handleInitialExplain}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all mx-auto"
        >
          <Sparkles size={18} />
          <span>Ask the Spirit Guide</span>
        </button>
      ) : (
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-orange-200 shadow-xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-4 border-b border-orange-100 pb-2">
                <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={20} />
                    Gita Insight
                </h3>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="text-orange-400 hover:text-orange-700"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="prose prose-orange max-w-none text-gray-800 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                {isLoading && !explanation ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3">
                         <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                         <p className="text-sm text-orange-600 animate-pulse">Consulting the ancient wisdom...</p>
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {explanation}
                    </div>
                )}
            </div>

            <div className="relative">
                <input 
                    type="text" 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                    placeholder="Ask a specific question about this verse..."
                    className="w-full bg-white border border-orange-200 rounded-full py-3 px-5 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder-orange-300"
                />
                <button 
                    onClick={handleAsk}
                    disabled={isLoading || !question.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? (
                         <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
                    ) : (
                        <Send size={18} />
                    )}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ExplanationPanel;