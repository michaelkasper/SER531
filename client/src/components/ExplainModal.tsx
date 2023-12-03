import React from "react";
import {Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {StardogExplained} from "../types/StardogExplained";
import {Divider} from "./Divider";
import {Modal} from "./Modal";

const useStyles = makeStyles()({
    body: {
        overflow: 'scroll',
        height: '100%'
    },
    pre: {
        fontSize: 10,
    }
});


type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    explained: StardogExplained | null;
}

export const ExplainModal = ({open, onClose, explained, title}: Props) => {
    const {classes} = useStyles();
    return <Modal
        open={open}
        onClose={onClose}
    >
        <Typography id={"modal-modal-title"} variant="h6" component="h2">
            {title}
        </Typography>
        <div id={'modal-modal-description'} className={classes.body}>
            <Typography id={"modal-modal-title"} component="h2">
                Query
            </Typography>
            <Divider/>
            <pre className={classes.pre}>{explained?.queryString}</pre>

            <Typography id={"modal-modal-title"} component="h2">
                Explanation
            </Typography>
            <Divider/>
            <pre className={classes.pre}>{explained?.details}</pre>
        </div>
    </Modal>
}
