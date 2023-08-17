// @ts-nocheck
import { Button } from '@aws-amplify/ui-react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 0;
  }
  50% {
    opacity: .4;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  text-align: center;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #4867ff;
`;

export const ResultBox = styled.div`
  margin-top: 45px;
`;

export const StyledButton = styled(Button)`
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  height: 100px;
  margin: 45px auto;
  width: 100px;
  position: relative;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid currentColor;
    content: '';

    ${({ isListening }) =>
      isListening &&
      css`
        animation: ${ripple} 1.2s infinite ease-in-out;
      `}
  }
`;
