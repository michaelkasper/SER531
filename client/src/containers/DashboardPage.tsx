import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {useStardog} from "../hooks/useStardog";
import {ResponseExample} from "../types/ResponsExample";

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


export const DashboardPage = () => {
    const {classes} = useStyles();
    const {results} = useStardog<ResponseExample>('select distinct ?s ?p ?o where { ?s ?p ?o }');


    console.log(results);

    return (
        <div className={classes.root}>

        </div>
    );
}
