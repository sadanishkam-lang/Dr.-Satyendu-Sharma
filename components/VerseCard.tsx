import React, { useState } from 'react';
import { Verse } from '../types';
import AudioPlayer from './AudioPlayer';
import ExplanationPanel from './ExplanationPanel';
import { Upload } from 'lucide-react';

interface VerseCardProps {
  verse: Verse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  const [audioSrc, setAudioSrc] = useState<string | undefined>(verse.audioUrl);
  const [imageSrc, setImageSrc] = useState<string | undefined>(verse.imageUrl);

  // Helper to handle local file uploads for the demo experience
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'audio') setAudioSrc(url);
      else setImageSrc(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
        
        {/* Header Section */}
        <div className="bg-orange-900 text-orange-50 px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-medium tracking-wide">Chapter {verse.chapter}, Verse {verse.verse}</h2>
            <span className="text-sm opacity-80 uppercase tracking-widest text-xs">Bhagavad Gita</span>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column: Image */}
            <div className="relative h-96 md:h-auto bg-orange-100 group overflow-hidden">
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt="Verse visualization" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-orange-300">
                        <span>No Image Loaded</span>
                    </div>
                )}
                
                {/* Image Upload Overlay */}
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-300">
                    <Upload size={32} className="mb-2" />
                    <span className="text-sm font-medium">Change Visual</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />
                </label>
            </div>

            {/* Right Column: Verse Text */}
            <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/50">
                
                {/* Sanskrit */}
                <div className="text-center mb-6">
                    <p className="sanskrit-font text-3xl md:text-4xl text-gray-900 leading-relaxed font-bold">
                        {verse.sanskrit}
                    </p>
                </div>

                {/* Transliteration */}
                <div className="text-center mb-6">
                    <p className="text-lg text-orange-800 italic font-serif opacity-80">
                        {verse.transliteration}
                    </p>
                </div>

                {/* Divider */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-1 bg-orange-300 rounded-full"></div>
                </div>

                {/* English Translation */}
                <div className="text-center mb-8">
                    <p className="text-gray-700 leading-loose font-light text-lg">
                        {verse.translation}
                    </p>
                </div>

                {/* File Upload for Audio (Hidden if using default, shown for demo) */}
                {!audioSrc && (
                   <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 cursor-pointer hover:bg-orange-50 transition-colors mb-4">
                        <Upload size={20} />
                        <span className="text-sm font-semibold">Upload Recitation Audio</span>
                        <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'audio')} />
                   </label>
                )}

                <AudioPlayer src={audioSrc} />
            </div>
        </div>
      </div>
        
      {/* AI Explanation Section */}
      <ExplanationPanel verseText={verse.translation} />
    </div>
  );
};

export default VerseCard;