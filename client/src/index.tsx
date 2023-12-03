import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {ThemeProvider} from '@mui/material/styles';

export const muiCache = createCache({
    key: 'mui',
    prepend: true,
});

ReactDOM.render(
    <React.StrictMode>
        <CacheProvider value={muiCache}>
            <ThemeProvider theme={{}}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </CacheProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
