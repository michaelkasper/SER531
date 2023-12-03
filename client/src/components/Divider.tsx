import React from "react";
import {Divider as MuiDivider} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
});

export const Divider = () => {
    const {classes} = useStyles();
    return (
        <MuiDivider light className={classes.divider}/>
    );
}
