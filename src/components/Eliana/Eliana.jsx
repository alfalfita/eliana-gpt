// @ts-nocheck
import React from 'react';
import * as St from './Eliana.styles';

export const Eliana = ({ withBorder }) => {
  return (
    <>
      <St.Container withBorder={withBorder}>
        el<St.Hightlight>[IA]</St.Hightlight>na
      </St.Container>
      <span> 🤖</span>
    </>
  );
};
