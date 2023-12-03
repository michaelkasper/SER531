import React from "react";
import {makeStyles} from 'tss-react/mui';
import {Outlet} from "react-router-dom";
import {Header} from "./Header";


const useStyles = makeStyles()({
    body: {
        marginTop: 20
    }
});

export const PageLayout = () => {
    const {classes} = useStyles();

    return (
        <div>
            <Header/>
            <div className={classes.body}>
                <Outlet/>
            </div>
        </div>
    );
}
