import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PageLayout} from "./components/PageLayout";
import {DashboardPage} from "./containers/DashboardPage";
import {SearchPage} from "./containers/SearchPage";
import {ArtworkPage} from "./containers/ArtworkPage";
import {GlobalStyles} from "tss-react";


export const App: React.FC = () => {
    return (
        <>
            <GlobalStyles
                styles={{
                    "body": {
                        fontFamily: "Roboto-Regular, Helvetica",
                        color: '#000000',
                        fontSize: 12,
                        fontWeight: 400
                    },
                    "*": {
                        boxSizing: 'border-box'
                    },
                    '.react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar': {
                        display: 'none'
                    },
                    '.react-horizontal-scrolling-menu--scroll-container': {
                        ['-ms-overflow-style']: 'none',
                        scrollbarWidth: 'none'
                    }
                }}
            />
            <Routes>
                <Route path="/">
                    <Route index element={<DashboardPage/>}/>
                </Route>

                <Route path="/" element={<PageLayout/>}>
                    <Route path="search" element={<SearchPage/>}/>
                    <Route path="artwork" element={<ArtworkPage/>}/>
                    <Route path="*" element={<DashboardPage/>}/>
                </Route>
            </Routes>
        </>
    );
};
