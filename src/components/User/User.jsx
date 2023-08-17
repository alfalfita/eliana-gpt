import React from 'react';
import { Text } from '@aws-amplify/ui-react';

import * as St from './User.styles';

export const User = ({ user, signOut }) => {
  return (
    <St.Container>
      <St.Left>
        <Text variation="primary" fontWeight={400} fontSize="2em">
          Hi {user.username} 👋
        </Text>
      </St.Left>
      <St.Right>
        <St.StyledButton onClick={signOut} variation="primary">
          Sign out
        </St.StyledButton>
      </St.Right>
    </St.Container>
  );
};
