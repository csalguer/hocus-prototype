import React from 'react';
import { Book, Mic, MessageSquare, Brain } from 'lucide-react';

const Practice = () => {
  const practiceCategories = [
    {
      title: 'Vocabulary',
      description: 'Practice essential Vietnamese words and phrases',
      icon: Book,
      count: 50,
      total: 100,
    },
    {
      title: 'Speaking',
      description: 'Improve your pronunciation and fluency',
      icon: Mic,
      count: 25,
      total: 50,
    },
    {
      title: 'Conversation',
      description: 'Practice real-world dialogue scenarios',
      icon: MessageSquare,
      count: 15,
      total: 30,
    },
    {
      title: 'Grammar',
      description: 'Master Vietnamese grammar rules',
      icon: Brain,
      count: 20,
      total: 40,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <h1 className="font-serif text-3xl font-medium text-gray-900 mb-2">Practice Center</h1>
        <p className="text-lg text-gray-600">Choose a category to practice and improve your Vietnamese skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-primary-200 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors duration-300">
                <category.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-xl font-medium text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span className="font-medium">{category.count}/{category.total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary-600 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(category.count / category.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <h2 className="font-serif text-2xl font-medium text-gray-900 mb-4">Daily Challenge</h2>
        <div className="p-6 bg-primary-50 rounded-lg border border-primary-100">
          <p className="text-primary-800 text-lg mb-4">Complete today's challenge to earn bonus points!</p>
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
