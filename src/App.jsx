import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Speech } from './components/Speech';
import styled from '@emotion/styled';
import { GlobalStyle } from './config/GlobalStyle';
import { User } from './components/User';
import '@aws-amplify/ui-react/styles.css';

const Wrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 15px;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Authenticator>
          {({ signOut, user }) => (
            <>
              <User user={user} signOut={signOut} />
              <Speech />
            </>
          )}
        </Authenticator>
      </Wrapper>
    </>
  );
};

export default App;
