import {Grid, Typography} from "@mui/material";
import * as React from "react";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
        root: {
            marginBottom: 20
        },
        label: {
            textTransform: 'uppercase',
        },
        value: {},
    })
);


type Props = {
    label: string;
    value?: string
}

export const ArtworkDetailsRow = ({label, value}: Props) => {
    const {classes} = useStyles();
    if (!value) {
        return null;
    }
    return <Grid container spacing={2} justifyContent="flex-start" className={classes.root}>
        <Grid item xs={2} className={classes.label}>
            <Typography variant="body2">{label}:</Typography>
        </Grid>
        <Grid item xs={10} className={classes.value}>
            <Typography variant="body2">{value}</Typography>
        </Grid>
    </Grid>;
}
