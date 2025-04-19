import React from 'react';
import { Volume2 } from 'lucide-react';

interface VocabularyProps {
  vocabulary: {
    vietnamese: string;
    english: string;
    pronunciation: string;
    audioUrl: string;
  }[];
}

const VocabularySection: React.FC<VocabularyProps> = ({ vocabulary }) => {
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-gray-900">Vocabulary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vocabulary.map((word, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900">{word.vietnamese}</p>
                <p className="text-gray-600">{word.pronunciation}</p>
                <p className="text-gray-700">{word.english}</p>
              </div>
              <button
                onClick={() => playAudio(word.audioUrl)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <Volume2 className="w-5 h-5 text-primary-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularySection;
