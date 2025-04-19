import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DialogueSection from './lesson/DialogueSection';
import VocabularySection from './lesson/VocabularySection';
import GrammarSection from './lesson/GrammarSection';
import PracticeSection from './lesson/PracticeSection';

// Mock data - replace with actual data from your database
const mockLesson = {
  title: "Greetings and Basic Conversations",
  level: "A1",
  dialogue: [
    {
      vietnamese: "Xin chào!",
      english: "Hello!",
      pronunciation: "sin chow",
      audioUrl: "https://example.com/audio/xin-chao.mp3"
    },
    {
      vietnamese: "Bạn khỏe không?",
      english: "How are you?",
      pronunciation: "ban kwe khom",
      audioUrl: "https://example.com/audio/ban-khoe-khong.mp3"
    }
  ],
  vocabulary: [
    {
      vietnamese: "xin chào",
      english: "hello",
      pronunciation: "sin chow",
      audioUrl: "https://example.com/audio/xin-chao.mp3"
    },
    {
      vietnamese: "tạm biệt",
      english: "goodbye",
      pronunciation: "tam byet",
      audioUrl: "https://example.com/audio/tam-biet.mp3"
    }
  ],
  grammar: [
    {
      title: "Basic Question Structure",
      explanation: "In Vietnamese, questions often end with 'không' or 'chưa'.",
      examples: [
        {
          vietnamese: "Bạn khỏe không?",
          english: "Are you well?"
        },
        {
          vietnamese: "Bạn đã ăn cơm chưa?",
          english: "Have you eaten yet?"
        }
      ]
    }
  ],
  exercises: [
    {
      type: "multiple-choice",
      question: "What does 'Xin chào' mean?",
      options: ["Hello", "Goodbye", "Thank you", "Sorry"],
      correctAnswer: "Hello"
    },
    {
      type: "speaking",
      question: "Record yourself saying 'Xin chào'",
      audioPrompt: "https://example.com/audio/xin-chao.mp3"
    }
  ]
};

const LessonView = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState(mockLesson);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { title: "Dialogue", component: <DialogueSection dialogue={lesson.dialogue} /> },
    { title: "Vocabulary", component: <VocabularySection vocabulary={lesson.vocabulary} /> },
    { title: "Grammar", component: <GrammarSection grammar={lesson.grammar} /> },
    { title: "Practice", component: <PracticeSection exercises={lesson.exercises} /> }
  ];

  useEffect(() => {
    // TODO: Fetch lesson data from Supabase
    // const fetchLesson = async () => {
    //   const { data, error } = await supabase
    //     .from('lessons')
    //     .select('*')
    //     .eq('id', id)
    //     .single();
    //   if (data) setLesson(data);
    // };
    // fetchLesson();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-medium text-gray-900">{lesson.title}</h1>
            <p className="text-lg text-gray-600 mt-1">Level: {lesson.level}</p>
          </div>
        </div>

        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                activeSection === index
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {sections[activeSection].component}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          <button
            onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
            disabled={activeSection === sections.length - 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
