import React, {useContext, useEffect} from "react";
import {VisibilityContext} from "react-horizontal-scrolling-menu";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ArrowScroll} from "./ArrowScroll";
import {makeStyles} from "tss-react/mui";
import {Spinner} from "../Spinner";

const useStyles = makeStyles()({
    rightButton: {
        right: 0
    },
    fade: {
        width: 40,
        height: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        mask: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x',
        ['-webkit-mask']: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x'
    }
});

type Props = {
    onLoadMore: () => Promise<void>;
    loadingMore?: boolean;
}

export const RightArrowScroll = ({onLoadMore, loadingMore}: Props) => {
    const {classes} = useStyles();
    const {isLastItemVisible, scrollNext, items} = useContext(VisibilityContext);

    const handelOnClick = () => {
        if (!loadingMore) {
            scrollNext();
        }
    }

    useEffect(() => {
        (async () => {
            if (isLastItemVisible) {
                await onLoadMore();
                scrollNext();
            }
        })();
    }, [onLoadMore, isLastItemVisible]);

    if ((isLastItemVisible && !loadingMore) || items.size === 0) {
        return null;
    }

    return (
        <>
            <div className={classes.fade}/>
            <ArrowScroll onClick={handelOnClick} className={classes.rightButton}>
                {!loadingMore && <ArrowForwardIosIcon/>}
                {loadingMore && <Spinner/>}
            </ArrowScroll>
        </>
    );
}
