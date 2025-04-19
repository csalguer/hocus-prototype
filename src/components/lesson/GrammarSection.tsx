import React from 'react';

interface GrammarProps {
  grammar: {
    title: string;
    explanation: string;
    examples: {
      vietnamese: string;
      english: string;
    }[];
  }[];
}

const GrammarSection: React.FC<GrammarProps> = ({ grammar }) => {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-gray-900">Grammar Notes</h2>
      <div className="space-y-8">
        {grammar.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-700 mb-4">{item.explanation}</p>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Examples:</h4>
              {item.examples.map((example, idx) => (
                <div key={idx} className="pl-4 border-l-2 border-primary-200">
                  <p className="text-gray-900">{example.vietnamese}</p>
                  <p className="text-gray-600">{example.english}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarSection;
