// @ts-nocheck
import React, { useEffect } from 'react';
import { Button, Text, Image } from '@aws-amplify/ui-react';
import { Eliana } from '../Eliana';

import { useVoice } from './useVoice';
import { useAnswerFetch } from './useAnswerFetch';
import * as St from './Speech.styles';

export const Speech = () => {
  const { question, listen, voiceSupported, isListening } = useVoice();
  const { elianaIsTyping, answer, isFetchingAnswer, fetchAnswer, isPlaying, source, setIsPlaying } = useAnswerFetch();

  const pauseAudio = () => {
    if (source.current && isPlaying) {
      source.current.stop();

      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (question !== '') {
      fetchAnswer(question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  if (!voiceSupported) {
    return (
      <Text variation="primary" fontWeight={400} as="h1" fontSize="2em">
        Voice recognition is not supported by your browser, please re-try with a supported browser e.g. Chrome
      </Text>
    );
  }

  return (
    <St.Container>
      <Text variation="primary" fontWeight={400} as="h1" fontSize="2em">
        Ask to <Eliana withBorder />
      </Text>
      <Text variation="primary" fontWeight={400}>
        Click the Mic and say your question
      </Text>
      <St.StyledButton onClick={listen} disabled={isListening} variation="link" isListening={isListening}>
        <Image alt="Say something" src="https://cdn-icons-png.flaticon.com/512/1186/1186128.png" width="50px" />
      </St.StyledButton>
      {question && (
        <Text variation="primary" fontWeight={400}>
          <St.Label>You say 🎙️:</St.Label> {question}
        </Text>
      )}
      <St.ResultBox>
        {elianaIsTyping && (
          <Text variation="primary" fontWeight={400}>
            <St.Label>
              <Eliana /> says:
            </St.Label>
            {isFetchingAnswer ? 'Thinking...' : <>{answer}</>}
          </Text>
        )}
        {isPlaying && (
          <Button onClick={pauseAudio} disabled={!source.current || !isPlaying} style={{ marginTop: '45px' }}>
            Stop
          </Button>
        )}
      </St.ResultBox>
    </St.Container>
  );
};
