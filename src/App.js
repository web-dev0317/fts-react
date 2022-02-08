import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import React from 'react';
import Layout from './pages';
import { useSocket } from './hooks/use-socket';
import { useValuesFromLS } from './hooks/use-values-from-ls';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Quicksand',
  },
});

function App() {
  useValuesFromLS();
  useSocket();

  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
