import React, {PropsWithChildren} from "react";
import {Box, Modal as MuiModal} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    wrapper: {
        width: '70vw',
        height: '70vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
    }
});


type Props = {
    open: boolean;
    onClose: () => void;
}

export const Modal = ({open, onClose, children}: PropsWithChildren<Props>) => {
    const {classes} = useStyles();
    return <MuiModal
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
            {children}
        </Box>
    </MuiModal>
}
