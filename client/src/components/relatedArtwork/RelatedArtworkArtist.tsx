import React from "react";
import {useStardogArtist} from "../../hooks/useStardogArtist";
import {Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import "react-horizontal-scrolling-menu/dist/styles.css";
import {ArtworkThumbnail} from "../ArtworkThumbnail";
import {ScrollBox} from "../ScrollWindow/ScrollBox";
import {StardogArtwork} from "../../types/StardogArtwork";

const useStyles = makeStyles()((theme) => ({
        root: {
            paddingTop: 20
        },
        wrapper: {
            position: 'relative',
            height: 210
        }
    })
);

type Props = {
    artwork: StardogArtwork;
}

export const RelatedArtworkArtist = ({artwork}: Props) => {
    const {classes} = useStyles();
    const {results: artistArtwork, getNextPage, loading} = useStardogArtist(artwork?.Artist?.value)

    if (artistArtwork.length === 0) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6">Other Works by Artist</Typography>

            <div className={classes.wrapper}>
                <ScrollBox onLoadMore={getNextPage} loadingMore={loading}>
                    {artistArtwork.map((artwork) => (
                        <ArtworkThumbnail
                            key={artwork?.Artwork?.value}
                            itemId={artwork?.Artwork?.value}
                            artwork={artwork}
                        />
                    ))}

                </ScrollBox>
            </div>

        </div>
    );
}
