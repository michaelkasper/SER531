import React, {MouseEvent} from "react";
import {StardogArtwork} from "../../types/StardogArtwork";
import {Button, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import "react-horizontal-scrolling-menu/dist/styles.css";
import {ArtworkThumbnail} from "../ArtworkThumbnail";
import {ScrollBox} from "../ScrollWindow/ScrollBox";
import {useStardog} from "../../hooks/useStardog";
import {stardogLocationArtworksQuery} from "../../api/stardogLocationArtworksQuery";
import {useExplainModal} from "../../hooks/useExplainModal";

const useStyles = makeStyles()({
    root: {
        paddingTop: 20
    },
    wrapper: {
        position: 'relative',
        height: 210
    }
});

type Props = {
    artwork: StardogArtwork;
}

export const RelatedArtworkLocation = ({artwork}: Props) => {
    const {classes} = useStyles();
    const {openExplain} = useExplainModal();
    const {
        results: locationArtwork,
        getNextPage,
        loading,
        explained
    } = useStardog<StardogArtwork>(stardogLocationArtworksQuery(artwork?.Location?.value));

    const onExplainSPARQL = (e: MouseEvent) => {
        e.preventDefault();
        if (explained) {
            openExplain("Other Works from Geographical Area", explained);
        }
    }

    if (locationArtwork.length === 0) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" display="inline">Other Works from Geographical Area </Typography>
            <Button size={'small'} onClick={onExplainSPARQL}>
                Explain SPARQL
            </Button>

            <div className={classes.wrapper}>
                <ScrollBox onLoadMore={getNextPage} loadingMore={loading}>
                    {locationArtwork.map((artwork) => (
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
