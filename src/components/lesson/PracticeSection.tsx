import React, { useState } from 'react';
import { Check, X, Volume2, ChevronLeft, ChevronRight, Mic, MessageSquare } from 'lucide-react';
import AudioRecorder from './AudioRecorder';

type QuestionType = 
  | 'multiple-choice'
  | 'free-response'
  | 'vocabulary-bank'
  | 'flashcard'
  | 'speaking'
  | 'image-selection';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string;
  audioPrompt?: string;
  imageUrls?: string[];
  vocabularyBank?: string[];
  points: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What is the correct translation for "Xin chào"?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correctAnswer: 'Hello',
    points: 1
  },
  {
    id: '2',
    type: 'free-response',
    question: 'Write the Vietnamese phrase for "How are you?"',
    correctAnswer: 'Bạn khỏe không',
    points: 2
  },
  {
    id: '3',
    type: 'vocabulary-bank',
    question: 'Match the correct words with their translations',
    vocabularyBank: ['xin chào', 'tạm biệt', 'cảm ơn', 'không có chi'],
    correctAnswer: 'hello,goodbye,thank you,you\'re welcome',
    points: 2
  },
  {
    id: '4',
    type: 'flashcard',
    question: 'Vietnamese Greetings',
    options: ['Xin chào', 'Hello', 'sin chow'],
    points: 1
  },
  {
    id: '5',
    type: 'speaking',
    question: 'Say the following phrase: "Xin chào, tôi tên là..."',
    audioPrompt: 'https://example.com/audio/greeting.mp3',
    points: 3
  },
  {
    id: '6',
    type: 'image-selection',
    question: 'Select the image that matches the word "cà phê" (coffee)',
    imageUrls: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=300',
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300'
    ],
    correctAnswer: '2',
    points: 1
  }
];

const PracticeSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [recordings, setRecordings] = useState<Record<string, Blob>>({});
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [mockQuestions[currentQuestion].id]: answer });
  };

  const handleRecording = (blob: Blob) => {
    setRecordings({ ...recordings, [mockQuestions[currentQuestion].id]: blob });
  };

  const calculateScore = () => {
    let totalScore = 0;
    mockQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    setScore(totalScore);
    setIsSubmitted(true);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border transition-colors duration-200 ${
                  answers[question.id] === option
                    ? isSubmitted
                      ? option === question.correctAnswer
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isSubmitted && answers[question.id] === option && (
                    option === question.correctAnswer ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 'free-response':
        return (
          <div className="space-y-4">
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
              placeholder="Type your answer here..."
            />
            {isSubmitted && (
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="font-medium text-gray-900">Correct Answer:</p>
                <p className="text-gray-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        );

      case 'vocabulary-bank':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {question.vocabularyBank?.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(word)}
                  className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  {word}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Type the matching translations, separated by commas..."
            />
          </div>
        );

      case 'flashcard':
        return (
          <div
            className="relative h-64 rounded-xl bg-white border border-gray-200 cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="space-y-4">
                <p className="text-2xl font-medium text-gray-900">
                  {showAnswer ? question.options?.[1] : question.options?.[0]}
                </p>
                {showAnswer && (
                  <p className="text-lg text-gray-600">
                    Pronunciation: {question.options?.[2]}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
              Click to flip
            </div>
          </div>
        );

      case 'speaking':
        return (
          <div className="space-y-4">
            {question.audioPrompt && (
              <button
                onClick={() => new Audio(question.audioPrompt).play()}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors duration-200"
              >
                <Volume2 className="w-5 h-5" />
                <span>Listen to Example</span>
              </button>
            )}
            <AudioRecorder onSave={handleRecording} />
          </div>
        );

      case 'image-selection':
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.imageUrls?.map((url, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index.toString())}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  answers[question.id] === index.toString()
                    ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50'
                    : 'border-transparent hover:border-primary-300'
                }`}
              >
                <img src={url} alt={`Option ${index + 1}`} className="w-full h-48 object-cover" />
                {isSubmitted && answers[question.id] === index.toString() && (
                  <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
                    index.toString() === question.correctAnswer ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {index.toString() === question.correctAnswer ? (
                      <Check className="w-8 h-8" />
                    ) : (
                      <X className="w-8 h-8" />
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-medium text-gray-900">End of Lesson Test</h2>
          {isSubmitted && (
            <div className="px-4 py-2 rounded-lg bg-primary-50 text-primary-700">
              Score: {score}/{mockQuestions.reduce((acc, q) => acc + q.points, 0)} points
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
            <span>{mockQuestions[currentQuestion].points} points</span>
          </div>

          <div className="p-6 rounded-xl bg-gray-50">
            <p className="text-lg font-medium text-gray-900 mb-6">
              {mockQuestions[currentQuestion].question}
            </p>
            {renderQuestion(mockQuestions[currentQuestion])}
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            {currentQuestion === mockQuestions.length - 1 ? (
              <button
                onClick={calculateScore}
                disabled={isSubmitted}
                className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors duration-200"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSection;
