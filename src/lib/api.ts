import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface WordDefinition {
  word: string;
  definitions: string[];
  pronunciation?: string;
  examples: string[];
  part_of_speech?: string;
}

export const dictionaryApi = {
  lookup: async (word: string): Promise<WordDefinition> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lookup/${encodeURIComponent(word)}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Word not found');
      }
      throw new Error('Failed to look up word');
    }
  },
};
