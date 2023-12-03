import React from "react";
import {makeStyles} from 'tss-react/mui';
import {Link} from "@mui/material";

const useStyles = makeStyles()({
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 20
    }
});

export const Footer = () => {
    const {classes} = useStyles();

    return (
        <div className={classes.footer}>
            <Link href="/analysis" variant="body2">Analysis</Link>
        </div>
    );
}
