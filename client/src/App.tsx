import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PageLayout} from "./components/PageLayout";
import {DashboardPage} from "./containers/DashboardPage";
import {ResultsPage} from "./containers/ResultsPage";
import {DetailPage} from "./containers/DetailPage";

export const App: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<PageLayout/>}>
                    <Route index element={<DashboardPage/>}/>
                    <Route path="results" element={<ResultsPage/>}/>
                    <Route path="details" element={<DetailPage/>}/>
                    <Route path="*" element={<DashboardPage/>}/>
                </Route>
            </Routes>
    );
};
