import React, {useContext} from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {VisibilityContext} from "react-horizontal-scrolling-menu";
import {ArrowScroll} from "./ArrowScroll";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    leftButton: {
        left: 0
    },
    fade: {
        width: 40,
        height: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
        mask: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x',
        // eslint-disable-next-line no-useless-computed-key
        ['-webkit-mask']: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x'
    }
});

export const LeftArrowScroll = () => {
    const {classes} = useStyles();
    const {
        isFirstItemVisible,
        scrollPrev,
        items
    } = useContext(VisibilityContext);

    if (isFirstItemVisible || items.size === 0) {
        return null;
    }

    return (
        <>
            <div className={classes.fade} />
            <ArrowScroll onClick={() => scrollPrev()} className={classes.leftButton}>
                <ArrowBackIosNewIcon/>
            </ArrowScroll>
        </>

    );
}
