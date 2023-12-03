import React, {MouseEvent} from "react";
import {Button, Link, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import "react-horizontal-scrolling-menu/dist/styles.css";
import {ArtworkThumbnail} from "../ArtworkThumbnail";
import {ScrollBox} from "../ScrollWindow/ScrollBox";
import {StardogArtwork} from "../../types/StardogArtwork";
import {useStardog} from "../../hooks/useStardog";
import {stardogArtistArtworksQuery} from "../../api/stardogArtistArtworksQuery";
import {useExplainModal} from "../../hooks/useExplainModal";

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
    const {openExplain} = useExplainModal();
    const {
        results: artistArtwork,
        getNextPage,
        loading,
        explained
    } = useStardog<StardogArtwork>(stardogArtistArtworksQuery(artwork?.Artist?.value));

    const onExplainSPARQL = (e: MouseEvent) => {
        e.preventDefault();
        if (explained) {
            openExplain("Other Works by Artist", explained);
        }
    }

    if (artistArtwork.length === 0) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" display="inline">Other Works by Artist </Typography>
            <Button size={'small'} onClick={onExplainSPARQL}>
                Explain SPARQL
            </Button>

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
