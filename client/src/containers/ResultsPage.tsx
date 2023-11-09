import * as React from "react";
import {makeStyles} from "tss-react/mui";


const useStyles = makeStyles()((theme) => ({
        root: {},
        body: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 200px'
        }
    })
);

export const ResultsPage = () => {
    const {classes} = useStyles();

    return (
        <div className={classes.root}>

            <div className={classes.body}>

            </div>
        </div>
    );
}
