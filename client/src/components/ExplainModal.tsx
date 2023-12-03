import React, {PropsWithChildren} from "react";
import {Box, Modal, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {StardogExplained} from "../types/StardogExplained";
import {Divider} from "./Divider";

const useStyles = makeStyles()({
    wrapper: {
        width: '70vw',
        height: '70vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        overflow: 'scroll',
    },
    body: {
        fontSize: 10
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >

        <Box id="modal-modal-description"
             className={classes.wrapper}
             sx={{
                 bgcolor: 'background.paper',
                 boxShadow: 24,
                 p: 4,
             }}
        >
            <Typography id={"modal-modal-title"} variant="h6" component="h2">
                {title}
            </Typography>
            <div id={'modal-modal-description'} className={classes.body}>
                <Typography id={"modal-modal-title"} component="h2">
                    Query
                </Typography>
                <Divider/>
                <pre>{explained?.queryString}</pre>

                <Typography id={"modal-modal-title"} component="h2">
                    Explanation
                </Typography>
                <Divider/>
                <pre>{explained?.details}</pre>
            </div>
        </Box>
    </Modal>
}
