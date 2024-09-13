import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AdminPage } from './AdminPage';

function App() {
    return (
        <ThemeProvider theme={theme} >
            <AdminPage />
        </ThemeProvider>
    );
}

export default App;