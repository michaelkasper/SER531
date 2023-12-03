import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {ThemeProvider} from '@mui/material/styles';
import {ExplainModalProvider} from "./hooks/useExplainModal";

export const muiCache = createCache({
    key: 'mui',
    prepend: true,
});

ReactDOM.render(
    <React.StrictMode>
        <CacheProvider value={muiCache}>
            <ThemeProvider theme={{}}>
                <ExplainModalProvider>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </ExplainModalProvider>
            </ThemeProvider>
        </CacheProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
