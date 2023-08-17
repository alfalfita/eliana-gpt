// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'apigpt',
        endpoint: 'https://8dd8u4svh6.execute-api.us-east-1.amazonaws.com/dev',
      },
    ],
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
