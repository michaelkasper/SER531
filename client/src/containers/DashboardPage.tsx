import React from "react";
import {makeStyles} from "tss-react/mui";
import {Typography} from "@mui/material";
import {SearchBar} from "../components/SearchBar";
import {Footer} from "../components/Footer";

const useStyles = makeStyles()({
    root: {
        position: "relative",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200
    },
    header: {
        marginBottom: 20
    },
    logo: {
        padding: '3px 5px',
        fontSize: '36px !important',
        textAlign: 'center',
    },
    title: {
        padding: '3px 5px',
        textAlign: 'center',
        maxWidth: 300
    }
});


export const DashboardPage = () => {
    const {classes} = useStyles();

    return (
        <div>
            <div className={classes.root}>


                <div className={classes.header}>
                    <Typography className={classes.logo}>
                        PR<strong>ONTO</strong>
                    </Typography>

                    <Typography className={classes.title}>
                        Ontology driven art/museum database
                    </Typography>
                </div>


                <SearchBar/>
            </div>
            <Footer/>
        </div>
    );
}
