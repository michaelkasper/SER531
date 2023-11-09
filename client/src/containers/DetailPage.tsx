import * as React from "react";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
        root: {
            position: "relative",
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
);


export const DetailPage = () => {
    const {classes} = useStyles();

    return (
        <div className={classes.root}>

        </div>
    );
}

