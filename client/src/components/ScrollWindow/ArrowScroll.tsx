import React, {PropsWithChildren} from "react";
import {makeStyles} from "tss-react/mui";
import classNames from "classnames";
import {Button} from "@mui/material";

const useStyles = makeStyles()({
    button: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 4,
        minWidth: 40,
        userSelect: "none",
        ['@media (pointer: coarse)']: {
            /* If we detect a touch device without a mouse, do not show buttons; assume user will use swipe gestures to scroll */
            display: 'none'
        }
    }
});

type Props = {
    onClick: VoidFunction;
    className?: string;
}

export const ArrowScroll = ({children, onClick, className}: PropsWithChildren<Props>) => {
    const {classes} = useStyles();
    return (
        <Button
            size="small"
            variant="contained"
            className={classNames(classes.button, className)}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
