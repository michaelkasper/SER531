import React from "react";
import {LeftArrowScroll} from "./LeftArrowScroll";
import {RightArrowScroll} from "./RightArrowScroll";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    wrapper: {
        position: 'relative'
    }
});

type Props = {
    children: React.ReactElement<{ itemId: string }> | React.ReactElement<{ itemId: string }>[];
    onLoadMore?: () => void;
    loadingMore?: boolean;
}

export const ScrollBox = ({children, onLoadMore = () => null, loadingMore}: Props) => {
    const {classes} = useStyles();
    return (
        <div className={classes.wrapper}>
            <ScrollMenu
                LeftArrow={<LeftArrowScroll/>}
                RightArrow={<RightArrowScroll onLoadMore={onLoadMore} loadingMore={loadingMore}/>}
            >
                {children}
            </ScrollMenu>
        </div>
    )
}
