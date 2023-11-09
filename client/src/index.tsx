import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {ThemeProvider} from '@mui/material/styles';
import { store } from './redux/store'
import { Provider } from 'react-redux'

export const muiCache = createCache({
    key: 'mui',
    prepend: true,
});

ReactDOM.render(
    <React.StrictMode>
        <CacheProvider value={muiCache}>
            <ThemeProvider theme={{}}>
                <BrowserRouter>
                    <Provider store={store}>
                    <App/>
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        </CacheProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
