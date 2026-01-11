import React from 'react';
import { INITIAL_VERSE } from './constants';
import VerseCard from './components/VerseCard';
import { BookOpen } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-900 selection:bg-orange-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-orange-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <span className="font-serif font-bold text-xl text-gray-900 tracking-tight">Gita Explorer</span>
            </div>
            
            <div className="flex items-center space-x-4">
               <button className="text-sm font-medium text-orange-900 hover:text-orange-700 transition-colors">
                 Chapters
               </button>
               <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
                 About
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="text-center mb-10 px-4">
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                The Song of God
             </h1>
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore the timeless wisdom of the Bhagavad Gita, verse by verse, with interactive audio and AI-powered insights.
             </p>
        </div>

        <VerseCard verse={INITIAL_VERSE} />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm py-8 border-t border-orange-100/50">
            <p>Made with devotion & code.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;