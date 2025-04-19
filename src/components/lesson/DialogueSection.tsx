import React from 'react';
import { Volume2 } from 'lucide-react';

interface DialogueProps {
  dialogue: {
    vietnamese: string;
    english: string;
    pronunciation: string;
    audioUrl: string;
  }[];
}

const DialogueSection: React.FC<DialogueProps> = ({ dialogue }) => {
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-gray-900">Dialogue Practice</h2>
      <div className="space-y-4">
        {dialogue.map((line, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900">{line.vietnamese}</p>
                <p className="text-gray-600">{line.pronunciation}</p>
                <p className="text-gray-700">{line.english}</p>
              </div>
              <button
                onClick={() => playAudio(line.audioUrl)}
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

export default DialogueSection;
