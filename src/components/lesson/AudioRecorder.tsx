import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Save } from 'lucide-react';

interface AudioRecorderProps {
  onSave: (blob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.play();
    }
  };

  const handleSave = () => {
    if (audioBlob) {
      onSave(audioBlob);
      setAudioBlob(null);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="p-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
        >
          <Mic className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 animate-pulse"
        >
          <Square className="w-6 h-6" />
        </button>
      )}

      {audioBlob && (
        <>
          <button
            onClick={playRecording}
            className="p-3 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors duration-200"
          >
            <Play className="w-6 h-6" />
          </button>
          <button
            onClick={handleSave}
            className="p-3 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-200"
          >
            <Save className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
