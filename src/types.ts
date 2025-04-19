export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface User {
  id: string;
  email: string;
  currentLevel: LanguageLevel;
  progress: number;
  created_at: string;
}

export interface VocabularyItem {
  id: string;
  vietnamese: string;
  english: string;
  pronunciation: string;
  example: string;
  level: LanguageLevel;
  category: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: LanguageLevel;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  content: string;
  order: number;
}

export interface Unit {
  id: string;
  title: string;
  level: LanguageLevel;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  lastAttempt: string;
}
