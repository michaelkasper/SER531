import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PageLayout} from "./components/PageLayout";
import {DashboardPage} from "./containers/DashboardPage";
import {SearchPage} from "./containers/SearchPage";
import {DetailPage} from "./containers/DetailPage";

export const App: React.FC = () => {
    return (
            <Routes>
                <Route path="/" >
                    <Route index element={<DashboardPage/>}/>
                </Route>

                <Route path="/" element={<PageLayout/>}>
                    <Route path="search" element={<SearchPage/>}/>
                    <Route path="details" element={<DetailPage/>}/>
                    <Route path="*" element={<DashboardPage/>}/>
                </Route>
            </Routes>
    );
};
