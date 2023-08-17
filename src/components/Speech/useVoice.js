// @ts-nocheck
import { useState, useEffect } from 'react';

let speech;
if (window.webkitSpeechRecognition) {
  const SpeechRecognition = window.webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
} else {
  speech = null;
}

const useVoice = () => {
  const [question, setQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
    } else {
      speech.start();
    }
  };

  useEffect(() => {
    if (!speech) {
      return;
    }

    speech.onresult = (event) => {
      setQuestion(event.results[event.results.length - 1][0].transcript);
      setIsListening(false);
      speech.stop();
    };
  }, []);

  return {
    question,
    isListening,
    listen,
    voiceSupported: speech !== null,
  };
};

export { useVoice };
