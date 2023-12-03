import React from "react";
import {makeStyles} from 'tss-react/mui';
import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";

const useStyles = makeStyles()({
    body: {
        marginTop: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 20
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
            <Footer/>
        </div>
    );
}
