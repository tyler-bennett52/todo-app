import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { SettingsProvider } from './Context/Settings';
import { AuthProvider } from './Context/Auth';


import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
);
