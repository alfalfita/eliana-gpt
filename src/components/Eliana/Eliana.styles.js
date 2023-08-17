// @ts-nocheck
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.span`
  ${({ withBorder }) =>
    withBorder &&
    css`
      border-bottom: 1px dashed #d3d3d3;
    `}
`;

export const Hightlight = styled.span`
  color: #ff00ff;
  font-weight: bold;
`;
